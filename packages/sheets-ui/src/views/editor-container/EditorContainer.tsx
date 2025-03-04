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

import { DOCS_NORMAL_EDITOR_UNIT_ID_KEY } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { useDependency } from '@wendellhu/redi/react-bindings';
import React, { useEffect, useRef, useState } from 'react';
import { switchMap } from 'rxjs/operators';

import { ICellEditorManagerService } from '../../services/editor/cell-editor-manager.service';
import styles from './index.module.less';

interface ICellIEditorProps {}

const HIDDEN_EDITOR_POSITION = -1000;

const EDITOR_DEFAULT_POSITION = {
    width: 0,
    height: 0,
    top: HIDDEN_EDITOR_POSITION,
    left: HIDDEN_EDITOR_POSITION,
};

/**
 * Floating editor's container.
 * @returns
 */
export const EditorContainer: React.FC<ICellIEditorProps> = () => {
    const [state, setState] = useState({
        ...EDITOR_DEFAULT_POSITION,
    });

    const editorRef = useRef<HTMLDivElement>(null);

    const renderManagerService: IRenderManagerService = useDependency(IRenderManagerService);
    const cellEditorManagerService: ICellEditorManagerService = useDependency(ICellEditorManagerService);

    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) {
            return;
        }

        const renderSubscription = renderManagerService.currentRender$
            .pipe(
                switchMap(() => {
                    const engine = renderManagerService.getRenderById(DOCS_NORMAL_EDITOR_UNIT_ID_KEY)?.engine;
                    engine?.setContainer(editor);

                    return cellEditorManagerService.state$;
                })
            )
            .subscribe((param) => {
                if (param == null) {
                    return;
                }

                const {
                    startX = HIDDEN_EDITOR_POSITION,
                    startY = HIDDEN_EDITOR_POSITION,
                    endX = 0,
                    endY = 0,
                    show = false,
                } = param;

                if (!show) {
                    setState({
                        ...EDITOR_DEFAULT_POSITION,
                    });
                } else {
                    setState({
                        width: endX - startX,
                        height: endY - startY,
                        left: startX,
                        top: startY,
                    });

                    // update editor's rect
                    const editor = editorRef.current;
                    if (!editor) return;

                    const { left, top, width, height } = editor.getBoundingClientRect();
                    cellEditorManagerService.setRect({ left, top, width, height });
                }
            });

        return () => {
            renderSubscription.unsubscribe();
        };
    }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

    useEffect(() => {
        cellEditorManagerService.setFocus(true);
    }, [state]);

    return (
        <div
            className={styles.editorContainer}
            style={{
                left: state.left,
                top: state.top,
                width: state.width,
                height: state.height,
            }}
        >
            <div className={styles.editorInput} ref={editorRef} />
        </div>
    );
};
