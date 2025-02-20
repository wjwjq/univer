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

import type { ISequenceNode } from '@univerjs/engine-formula';
import { sequenceNodeType } from '@univerjs/engine-formula';
import type { IDisposable } from '@wendellhu/redi';
import { createIdentifier } from '@wendellhu/redi';
import type { Observable } from 'rxjs';
import { Subject } from 'rxjs';

export interface ISyncToEditorParam {
    textSelectionOffset: number;
    sequences: Array<string | ISequenceNode>;
}

export interface IFormulaInputService {
    syncToEditor$: Observable<ISyncToEditorParam>;

    inputFormula$: Observable<string>;

    changeRef$: Observable<boolean>;

    syncToEditor(textSelectionOffset: number): void;

    dispose(): void;

    getSequenceNodes(): Array<string | ISequenceNode>;

    setSequenceNodes(nodes: Array<string | ISequenceNode>): void;

    clearSequenceNodes(): void;

    getCurrentSequenceNodeIndex(strIndex: number): number;

    getCurrentSequenceNodeByIndex(nodeIndex: number): string | ISequenceNode;

    getCurrentSequenceNode(strIndex: number): string | ISequenceNode;

    updateSequenceRef(nodeIndex: number, refString: string): void;

    insertSequenceRef(index: number, refString: string): void;

    insertSequenceString(index: number, content: string): void;

    enableSelectionMoving(): void;

    disableSelectionMoving(): void;

    isSelectionMoving(): boolean;

    enableLockedSelectionChange(): void;

    disableLockedSelectionChange(): void;

    isLockedSelectionChange(): boolean;

    enableLockedSelectionInsert(): void;

    disableLockedSelectionInsert(): void;

    isLockedSelectionInsert(): boolean;

    inputFormula(formulaString: string): void;
}

export class FormulaInputService implements IFormulaInputService, IDisposable {
    private _sequenceNodes: Array<string | ISequenceNode> = [];

    private _isSelectionMoving = false;

    private _isLockedOnSelectionChangeRefString: boolean = false;

    private _isLockedOnSelectionInsertRefString: boolean = false;

    private readonly _syncToEditor$ = new Subject<ISyncToEditorParam>();

    readonly syncToEditor$ = this._syncToEditor$.asObservable();

    private _changeRef$ = new Subject<boolean>();

    readonly changeRef$ = this._changeRef$.asObservable();

    private readonly _inputFormula$ = new Subject<string>();

    readonly inputFormula$ = this._inputFormula$.asObservable();

    dispose(): void {
        this._sequenceNodes = [];
    }

    inputFormula(formulaString: string) {
        this._inputFormula$.next(formulaString);
    }

    syncToEditor(textSelectionOffset: number) {
        this._syncToEditor$.next({ sequences: this.getSequenceNodes(), textSelectionOffset });
    }

    getSequenceNodes() {
        return [...this._sequenceNodes];
    }

    setSequenceNodes(nodes: Array<string | ISequenceNode>) {
        this._sequenceNodes = nodes;
    }

    clearSequenceNodes() {
        this._sequenceNodes = [];
    }

    getCurrentSequenceNode(strIndex: number) {
        return this._sequenceNodes[this.getCurrentSequenceNodeIndex(strIndex)];
    }

    getCurrentSequenceNodeByIndex(nodeIndex: number) {
        return this._sequenceNodes[nodeIndex];
    }

    /**
     * Query the text coordinates in the sequenceNodes and determine the actual insertion index.
     * @param sequenceNodes
     * @param strIndex
     * @returns
     */
    getCurrentSequenceNodeIndex(strIndex: number) {
        let nodeIndex = 0;
        for (let i = 0, len = this._sequenceNodes.length; i < len; i++) {
            const node = this._sequenceNodes[i];

            if (typeof node === 'string') {
                nodeIndex++;
            } else {
                const { endIndex } = node;

                nodeIndex = endIndex;
            }

            if (strIndex <= nodeIndex) {
                return i;
            }
        }

        return this._sequenceNodes.length;
    }

    /**
     * Synchronize the reference text based on the changes of the selection.
     * @param refIndex
     * @param rangeWithCoord
     * @returns
     */
    updateSequenceRef(nodeIndex: number, refString: string) {
        const node = this._sequenceNodes[nodeIndex];

        if (typeof node === 'string' || node.nodeType !== sequenceNodeType.REFERENCE) {
            return;
        }

        const difference = refString.length - node.token.length;

        const newNode = { ...node };

        newNode.token = refString;

        newNode.endIndex += difference;

        this._sequenceNodes[nodeIndex] = newNode;

        for (let i = nodeIndex + 1, len = this._sequenceNodes.length; i < len; i++) {
            const node = this._sequenceNodes[i];
            if (typeof node === 'string') {
                continue;
            }

            const newNode = { ...node };

            newNode.startIndex += difference;
            newNode.endIndex += difference;

            this._sequenceNodes[i] = newNode;
        }

        this._changeRef$.next(true);
    }

    /**
     * When the cursor is on the right side of a formula token,
     * you can add reference text to the formula by drawing a selection.
     * @param index
     * @param range
     */
    insertSequenceRef(index: number, refString: string) {
        const refStringCount = refString.length;

        const nodeIndex = this.getCurrentSequenceNodeIndex(index);

        this._sequenceNodes.splice(nodeIndex, 0, {
            token: refString,
            startIndex: index,
            endIndex: index + refStringCount - 1,
            nodeType: sequenceNodeType.REFERENCE,
        });

        for (let i = nodeIndex + 1, len = this._sequenceNodes.length; i < len; i++) {
            const node = this._sequenceNodes[i];
            if (typeof node === 'string') {
                continue;
            }

            const newNode = { ...node };

            newNode.startIndex += refStringCount;
            newNode.endIndex += refStringCount;

            this._sequenceNodes[i] = newNode;
        }

        this._changeRef$.next(true);
    }

    /**
     * Insert a string at the cursor position in the text corresponding to the sequenceNodes.
     * @param sequenceNodes
     * @param index
     * @param content
     */
    insertSequenceString(index: number, content: string) {
        const nodeIndex = this.getCurrentSequenceNodeIndex(index);
        const str = content.split('');
        this._sequenceNodes.splice(nodeIndex, 0, ...str);

        const contentCount = str.length;

        for (let i = nodeIndex + contentCount, len = this._sequenceNodes.length; i < len; i++) {
            const node = this._sequenceNodes[i];
            if (typeof node === 'string') {
                continue;
            }

            const newNode = { ...node };

            newNode.startIndex += contentCount;
            newNode.endIndex += contentCount;

            this._sequenceNodes[i] = newNode;
        }

        this._changeRef$.next(true);
    }

    enableSelectionMoving() {
        this._isSelectionMoving = true;
    }

    disableSelectionMoving() {
        this._isSelectionMoving = false;
    }

    isSelectionMoving() {
        return this._isSelectionMoving;
    }

    enableLockedSelectionChange() {
        this._isLockedOnSelectionChangeRefString = true;
    }

    disableLockedSelectionChange() {
        this._isLockedOnSelectionChangeRefString = false;
    }

    isLockedSelectionChange() {
        return this._isLockedOnSelectionChangeRefString;
    }

    enableLockedSelectionInsert() {
        this._isLockedOnSelectionInsertRefString = true;
    }

    disableLockedSelectionInsert() {
        this._isLockedOnSelectionInsertRefString = false;
    }

    isLockedSelectionInsert() {
        return this._isLockedOnSelectionInsertRefString;
    }
}

export const IFormulaInputService = createIdentifier<FormulaInputService>('formula-ui.input-service');
