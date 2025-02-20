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

import { getArrayLength, type IObjectArrayPrimitiveType } from '../shared/object-matrix';
import type { Nullable } from '../shared/types';
import { BooleanNumber } from '../types/enum';
import type { IRange, IRowData, IWorksheetData } from '../types/interfaces';
import { RANGE_TYPE } from '../types/interfaces';

/**
 * Manage configuration information of all rows, get row height, row length, set row height, etc.
 *
 * @deprecated This class is not necessary. It increases the complexity of the code and does not bring any benefits.
 */
export class RowManager {
    private _rowData: IObjectArrayPrimitiveType<Partial<IRowData>>;

    constructor(
        private readonly _config: IWorksheetData,
        data: IObjectArrayPrimitiveType<Partial<IRowData>>
    ) {
        this._rowData = data;
    }

    /**
     * Get height and hidden status of columns in the sheet
     * @returns
     */
    getRowData(): IObjectArrayPrimitiveType<Partial<IRowData>> {
        return this._rowData;
    }

    getRowDatas(rowPos: number, numRows: number): IObjectArrayPrimitiveType<Partial<IRowData>> {
        const rowData: IObjectArrayPrimitiveType<Partial<IRowData>> = {};
        let index = 0;
        for (let i = rowPos; i < rowPos + numRows; i++) {
            const data = this.getRowOrCreate(i);
            rowData[index] = data;
            index++;
        }
        return rowData;
    }

    getRowHeight(rowPos: number): number;
    getRowHeight(rowPos: number, count: number): number;
    getRowHeight(rowPos: number, count: number = 1): number {
        const { _rowData } = this;
        const config = this._config;
        let height: number = 0;

        for (let i = 0; i < count; i++) {
            const row = _rowData[i + rowPos] || {
                hd: BooleanNumber.FALSE,
                h: config.defaultRowHeight,
            };
            const { isAutoHeight, ah, h = config.defaultRowHeight } = row;

            height += (isAutoHeight == null || !!isAutoHeight) && typeof ah === 'number' ? ah : h;
        }

        return height;
    }

    /**
     * Get row data of given row
     * @param rowPos row index
     * @returns
     */
    getRow(rowPos: number): Nullable<Partial<IRowData>> {
        return this._rowData[rowPos];
    }

    /**
     * Get given row data or create a row data when it's null
     * @param rowPos row index
     * @returns
     */
    getRowOrCreate(rowPos: number): Partial<IRowData> {
        const { _rowData } = this;
        const row = _rowData[rowPos];
        if (row) {
            return row;
        }
        const config = this._config;
        const create = { hd: BooleanNumber.FALSE, h: config.defaultRowHeight };
        _rowData[rowPos] = create;

        return create;
    }

    getHiddenRows(start: number = 0, end: number = getArrayLength(this._rowData) - 1): IRange[] {
        const hiddenRows: IRange[] = [];

        let inHiddenRange = false;
        let startRow = -1;

        for (let i = start; i <= end; i++) {
            const visible = this.getRowVisible(i);
            if (inHiddenRange && visible) {
                inHiddenRange = false;
                hiddenRows.push({
                    startRow,
                    endRow: i - 1,
                    startColumn: 0,
                    endColumn: 0,
                    rangeType: RANGE_TYPE.ROW,
                });
            } else if (!inHiddenRange && !visible) {
                inHiddenRange = true;
                startRow = i;
            }
        }

        if (inHiddenRange) {
            hiddenRows.push({ startRow, endRow: end, startColumn: 0, endColumn: 0, rangeType: RANGE_TYPE.ROW });
        }

        return hiddenRows;
    }

    getRowVisible(rowPos: number): boolean {
        const row = this.getRow(rowPos);
        if (!row) {
            return true;
        }

        return row.hd !== BooleanNumber.TRUE;
    }

    /**
     * Get count of row in the sheet
     * @returns
     */
    getSize(): number {
        return getArrayLength(this._rowData);
    }
}
