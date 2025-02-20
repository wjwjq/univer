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

import { deserializeRangeForR1C1, deserializeRangeWithSheet } from '@univerjs/core';

import { ErrorType } from '../../../basics/error-type';
import { REFERENCE_REGEX_COLUMN, REFERENCE_REGEX_ROW, REFERENCE_SINGLE_RANGE_REGEX } from '../../../basics/regex';
import type { BaseReferenceObject } from '../../../engine/reference-object/base-reference-object';
import { CellReferenceObject } from '../../../engine/reference-object/cell-reference-object';
import { ColumnReferenceObject } from '../../../engine/reference-object/column-reference-object';
import { RangeReferenceObject } from '../../../engine/reference-object/range-reference-object';
import { RowReferenceObject } from '../../../engine/reference-object/row-reference-object';
import type { ArrayValueObject } from '../../../engine/value-object/array-value-object';
import { type BaseValueObject, ErrorValueObject } from '../../../engine/value-object/base-value-object';
import { BaseFunction } from '../../base-function';

export class Indirect extends BaseFunction {
    override calculate(refText: BaseValueObject, a1?: BaseValueObject) {
        let a1Value = this.getZeroOrOneByOneDefault(a1);

        if (a1Value == null) {
            a1Value = 1;
        }

        if (refText.isError()) {
            return new ErrorValueObject(ErrorType.NA);
        }

        if (refText.isArray()) {
            const refTextArray = refText as ArrayValueObject;
            if (refTextArray.getRowCount() === 1 && refTextArray.getColumnCount() === 1) {
                refText = refTextArray.getFirstCell();
            } else {
                return refTextArray.map(() => {
                    return new ErrorValueObject(ErrorType.VALUE);
                });
            }
        }

        if (!refText.isString()) {
            return new ErrorValueObject(ErrorType.REF);
        }

        const refTextV = refText.getValue() as string;

        if (a1Value === 0) {
            const gridRange = deserializeRangeForR1C1(refTextV);

            const { range, sheetName, unitId } = gridRange;

            const rangeReferenceObject = new RangeReferenceObject(range);

            rangeReferenceObject.setForcedUnitIdDirect(unitId);
            rangeReferenceObject.setForcedSheetName(sheetName);

            return this._setDefault(rangeReferenceObject);
        }

        if (new RegExp(REFERENCE_SINGLE_RANGE_REGEX).test(refTextV)) {
            return this._setDefault(new CellReferenceObject(refTextV));
        }
        if (new RegExp(REFERENCE_REGEX_ROW).test(refTextV)) {
            return this._setDefault(new RowReferenceObject(refTextV));
        }

        if (new RegExp(REFERENCE_REGEX_COLUMN).test(refTextV)) {
            return this._setDefault(new ColumnReferenceObject(refTextV));
        }

        const gridRange = deserializeRangeWithSheet(refTextV);

        const { range, sheetName, unitId } = gridRange;

        const rangeReferenceObject = new RangeReferenceObject(range);

        rangeReferenceObject.setForcedUnitIdDirect(unitId);
        rangeReferenceObject.setForcedSheetName(sheetName);

        return this._setDefault(rangeReferenceObject);
    }

    private _setDefault(object: BaseReferenceObject) {
        if (this.unitId == null || this.subUnitId == null) {
            return new ErrorValueObject(ErrorType.REF);
        }
        object.setDefaultUnitId(this.unitId);
        object.setDefaultSheetId(this.subUnitId);
        return object;
    }
}
