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

import type { IRange, IScale } from '@univerjs/core';

import { getColor } from '../../../basics/tools';
import type { UniverRenderingContext } from '../../../context';
import { SpreadsheetExtensionRegistry } from '../../extension';
import type { SpreadsheetSkeleton } from '../sheet-skeleton';
import { SheetExtension } from './sheet-extension';

const UNIQUE_KEY = 'DefaultBackgroundExtension';

const DOC_EXTENSION_Z_INDEX = 40;

export class Background extends SheetExtension {
    override uKey = UNIQUE_KEY;

    override zIndex = DOC_EXTENSION_Z_INDEX;

    override draw(
        ctx: UniverRenderingContext,
        parentScale: IScale,
        spreadsheetSkeleton: SpreadsheetSkeleton,
        diffRanges?: IRange[]
    ) {
        const { dataMergeCache, stylesCache } = spreadsheetSkeleton;
        const { background, backgroundPositions } = stylesCache;
        if (!spreadsheetSkeleton) {
            return;
        }

        const { rowHeightAccumulation, columnTotalWidth, columnWidthAccumulation, rowTotalHeight } =
            spreadsheetSkeleton;

        if (
            !rowHeightAccumulation ||
            !columnWidthAccumulation ||
            columnTotalWidth === undefined ||
            rowTotalHeight === undefined
        ) {
            return;
        }
        ctx.save();

        ctx.globalCompositeOperation = 'destination-over';

        background &&
            Object.keys(background).forEach((rgb: string) => {
                const backgroundCache = background[rgb];
                // eslint-disable-next-line no-magic-numbers
                ctx.fillStyle = rgb || getColor([255, 255, 255])!;
                ctx.beginPath();
                backgroundCache.forValue((rowIndex, columnIndex) => {
                    const cellInfo = backgroundPositions?.getValue(rowIndex, columnIndex);

                    if (cellInfo == null) {
                        return true;
                    }
                    let { startY, endY, startX, endX } = cellInfo;
                    const { isMerged, isMergedMainCell, mergeInfo } = cellInfo;
                    if (isMerged) {
                        return true;
                    }

                    if (
                        !this.isRenderDiffRangesByCell(
                            {
                                startRow: mergeInfo.startRow,
                                endRow: mergeInfo.endRow,
                                startColumn: mergeInfo.startColumn,
                                endColumn: mergeInfo.endColumn,
                            },
                            diffRanges
                        )
                    ) {
                        return true;
                    }

                    // if (
                    //     !this.isRenderDiffRangesByColumn(mergeInfo.startColumn, diffRanges) &&
                    //     !this.isRenderDiffRangesByColumn(mergeInfo.endColumn, diffRanges)
                    // ) {
                    //     return true;
                    // }

                    if (isMergedMainCell) {
                        startY = mergeInfo.startY;
                        endY = mergeInfo.endY;
                        startX = mergeInfo.startX;
                        endX = mergeInfo.endX;
                    }

                    ctx.moveTo(startX, startY);
                    ctx.lineTo(startX, endY);
                    ctx.lineTo(endX, endY);
                    ctx.lineTo(endX, startY);
                });
                ctx.closePath();
                ctx.fill();
            });
        ctx.restore();
    }
}

SpreadsheetExtensionRegistry.add(new Background());
