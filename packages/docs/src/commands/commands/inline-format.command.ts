/**
 * Copyright 2023-present DreamNum Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { ICommand, IDocumentBody, IMutationInfo, IStyleBase, ITextDecoration, ITextRun } from '@univerjs/core';
import {
    BaselineOffset,
    BooleanNumber,
    CommandType,
    DOCS_FORMULA_BAR_EDITOR_UNIT_ID_KEY,
    DOCS_NORMAL_EDITOR_UNIT_ID_KEY,
    ICommandService,
    IUndoRedoService,
    IUniverInstanceService,
    MemoryCursor,
} from '@univerjs/core';
import { type TextRange } from '@univerjs/engine-render';

import { TextSelectionManagerService } from '../../services/text-selection-manager.service';
import type { IRichTextEditingMutationParams } from '../mutations/core-editing.mutation';
import { RichTextEditingMutation } from '../mutations/core-editing.mutation';

export interface ISetInlineFormatCommandParams {
    segmentId: string;
    preCommandId: string;
    value?: string;
}

export const SetInlineFormatBoldCommand: ICommand = {
    id: 'doc.command.set-inline-format-bold',
    type: CommandType.COMMAND,
    handler: async () => true,
};

export const SetInlineFormatItalicCommand: ICommand = {
    id: 'doc.command.set-inline-format-italic',
    type: CommandType.COMMAND,
    handler: async () => true,
};

export const SetInlineFormatUnderlineCommand: ICommand = {
    id: 'doc.command.set-inline-format-underline',
    type: CommandType.COMMAND,
    handler: async () => true,
};

export const SetInlineFormatStrikethroughCommand: ICommand = {
    id: 'doc.command.set-inline-format-strikethrough',
    type: CommandType.COMMAND,
    handler: async () => true,
};

export const SetInlineFormatSubscriptCommand: ICommand = {
    id: 'doc.command.set-inline-format-subscript',
    type: CommandType.COMMAND,
    handler: async () => true,
};

export const SetInlineFormatSuperscriptCommand: ICommand = {
    id: 'doc.command.set-inline-format-superscript',
    type: CommandType.COMMAND,
    handler: async () => true,
};

export const SetInlineFormatFontSizeCommand: ICommand = {
    id: 'doc.command.set-inline-format-fontsize',
    type: CommandType.COMMAND,
    handler: async () => true,
};

export const SetInlineFormatFontFamilyCommand: ICommand = {
    id: 'doc.command.set-inline-format-font-family',
    type: CommandType.COMMAND,
    handler: async () => true,
};

export const SetInlineFormatTextColorCommand: ICommand = {
    id: 'doc.command.set-inline-format-text-color',
    type: CommandType.COMMAND,
    handler: async () => true,
};

const COMMAND_ID_TO_FORMAT_KEY_MAP: Record<string, keyof IStyleBase> = {
    [SetInlineFormatBoldCommand.id]: 'bl',
    [SetInlineFormatItalicCommand.id]: 'it',
    [SetInlineFormatUnderlineCommand.id]: 'ul',
    [SetInlineFormatStrikethroughCommand.id]: 'st',
    [SetInlineFormatFontSizeCommand.id]: 'fs',
    [SetInlineFormatFontFamilyCommand.id]: 'ff',
    [SetInlineFormatTextColorCommand.id]: 'cl',
    [SetInlineFormatSubscriptCommand.id]: 'va',
    [SetInlineFormatSuperscriptCommand.id]: 'va',
};

export const SetInlineFormatCommand: ICommand<ISetInlineFormatCommandParams> = {
    id: 'doc.command.set-inline-format',
    type: CommandType.COMMAND,
    handler: async (accessor, params: ISetInlineFormatCommandParams) => {
        const { segmentId, value, preCommandId } = params;
        const undoRedoService = accessor.get(IUndoRedoService);
        const commandService = accessor.get(ICommandService);
        const textSelectionManagerService = accessor.get(TextSelectionManagerService);
        const currentUniverService = accessor.get(IUniverInstanceService);

        const selections = textSelectionManagerService.getSelections();

        if (!Array.isArray(selections) || selections.length === 0) {
            return false;
        }

        let docsModel = currentUniverService.getCurrentUniverDocInstance();
        let unitId = docsModel.getUnitId();

        // When setting the formula bar style, the effect will be displayed in the cell editor,
        // and the formula bar only displays plain text.
        if (unitId === DOCS_FORMULA_BAR_EDITOR_UNIT_ID_KEY) {
            docsModel = currentUniverService.getUniverDocInstance(DOCS_NORMAL_EDITOR_UNIT_ID_KEY)!;
            unitId = docsModel.getUnitId();
        }

        let formatValue;

        switch (preCommandId) {
            case SetInlineFormatBoldCommand.id: // fallthrough
            case SetInlineFormatItalicCommand.id: // fallthrough
            case SetInlineFormatUnderlineCommand.id: // fallthrough
            case SetInlineFormatStrikethroughCommand.id: // fallthrough
            case SetInlineFormatSubscriptCommand.id: // fallthrough
            case SetInlineFormatSuperscriptCommand.id: {
                formatValue = getReverseFormatValueInSelection(
                    docsModel.getBody()!.textRuns!,
                    preCommandId,
                    selections
                );

                break;
            }

            case SetInlineFormatFontSizeCommand.id:
            case SetInlineFormatFontFamilyCommand.id: {
                formatValue = value;
                break;
            }

            case SetInlineFormatTextColorCommand.id: {
                formatValue = {
                    rgb: value,
                };
                break;
            }

            default: {
                throw new Error(`Unknown command: ${preCommandId} in handleInlineFormat`);
            }
        }

        const doMutation: IMutationInfo<IRichTextEditingMutationParams> = {
            id: RichTextEditingMutation.id,
            params: {
                unitId,
                mutations: [],
            },
        };

        const memoryCursor = new MemoryCursor();

        memoryCursor.reset();

        for (const selection of selections) {
            const { startOffset, endOffset } = selection;

            const body: IDocumentBody = {
                dataStream: '',
                textRuns: [
                    {
                        st: 0,
                        ed: endOffset - startOffset,
                        ts: {
                            [COMMAND_ID_TO_FORMAT_KEY_MAP[preCommandId]]: formatValue,
                        },
                    },
                ],
            };

            const len = startOffset - memoryCursor.cursor;

            if (len !== 0) {
                doMutation.params!.mutations.push({
                    t: 'r',
                    len,
                    segmentId,
                });
            }

            doMutation.params!.mutations.push({
                t: 'r',
                body,
                len: endOffset - startOffset,
                segmentId,
            });

            memoryCursor.reset();
            memoryCursor.moveCursor(endOffset);
        }

        const result = commandService.syncExecuteCommand<
            IRichTextEditingMutationParams,
            IRichTextEditingMutationParams
        >(doMutation.id, doMutation.params);

        const REFRESH_SELECTION_COMMAND_LIST = [
            SetInlineFormatBoldCommand.id,
            SetInlineFormatFontSizeCommand.id,
            SetInlineFormatFontFamilyCommand.id,
            SetInlineFormatSubscriptCommand.id,
            SetInlineFormatSuperscriptCommand.id,
        ];

        /**
         * refresh selection.
         */
        if (REFRESH_SELECTION_COMMAND_LIST.includes(preCommandId)) {
            textSelectionManagerService.refreshSelection();
        }

        if (result) {
            undoRedoService.pushUndoRedo({
                unitID: unitId,
                undoMutations: [{ id: RichTextEditingMutation.id, params: result }],
                redoMutations: [{ id: RichTextEditingMutation.id, params: doMutation.params }],
                undo() {
                    commandService.syncExecuteCommand(RichTextEditingMutation.id, result);
                    if (REFRESH_SELECTION_COMMAND_LIST.includes(preCommandId)) {
                        textSelectionManagerService.refreshSelection();
                    }

                    return true;
                },
                redo() {
                    commandService.syncExecuteCommand(RichTextEditingMutation.id, doMutation.params);
                    if (REFRESH_SELECTION_COMMAND_LIST.includes(preCommandId)) {
                        textSelectionManagerService.refreshSelection();
                    }

                    return true;
                },
            });

            return true;
        }

        return false;
    },
};

function isTextDecoration(value: unknown | ITextDecoration): value is ITextDecoration {
    return value !== null && typeof value === 'object';
}

/**
 * When clicking on a Bold menu item, you should un-bold if there is bold in the selections,
 * or bold if there is no bold text. This method is used to get the reverse style value calculated
 * from textRuns in the selection
 */
function getReverseFormatValueInSelection(
    textRuns: ITextRun[],
    preCommandId: string,
    selections: TextRange[]
): BooleanNumber | ITextDecoration | BaselineOffset {
    let ti = 0;
    let si = 0;
    const key: keyof IStyleBase = COMMAND_ID_TO_FORMAT_KEY_MAP[preCommandId];

    while (ti !== textRuns.length && si !== selections.length) {
        const { startOffset, endOffset } = selections[si];

        // TODO: @jocs handle sid in textRun
        const { st, ed, ts } = textRuns[ti];

        if (endOffset! <= st) {
            si++;
        } else if (ed <= startOffset!) {
            ti++;
        } else {
            if (ts?.[key] == null) {
                if (/bl|it/.test(key)) {
                    return BooleanNumber.TRUE;
                }

                if (/ul|st/.test(key)) {
                    return {
                        s: BooleanNumber.TRUE,
                    };
                }

                if (/va/.test(key)) {
                    return preCommandId === SetInlineFormatSubscriptCommand.id
                        ? BaselineOffset.SUBSCRIPT
                        : BaselineOffset.SUPERSCRIPT;
                }
            }

            if (isTextDecoration(ts?.[key]) && (ts[key] as ITextDecoration).s === BooleanNumber.FALSE) {
                return {
                    s: BooleanNumber.TRUE,
                };
            }

            if (preCommandId === SetInlineFormatSubscriptCommand.id && ts?.[key] !== BaselineOffset.SUBSCRIPT) {
                return BaselineOffset.SUBSCRIPT;
            }

            if (preCommandId === SetInlineFormatSuperscriptCommand.id && ts?.[key] !== BaselineOffset.SUPERSCRIPT) {
                return BaselineOffset.SUPERSCRIPT;
            }

            if (ts?.[key] === BooleanNumber.FALSE) {
                return BooleanNumber.TRUE;
            }

            ti++;
        }
    }

    return /bl|it/.test(key)
        ? BooleanNumber.FALSE
        : /ul|st/.test(key)
          ? {
                s: BooleanNumber.FALSE,
            }
          : BaselineOffset.NORMAL;
}
