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

import type { IOperation } from '@univerjs/core';
import { CommandType, IUniverInstanceService, Tools } from '@univerjs/core';
import type { IAccessor } from '@wendellhu/redi';

export interface ISetZoomRatioOperationParams {
    zoomRatio: number;
    unitId: string;
    subUnitId: string;
}

export const SetZoomRatioUndoMutationFactory = (
    accessor: IAccessor,
    params: ISetZoomRatioOperationParams
): ISetZoomRatioOperationParams => {
    const workbook = accessor.get(IUniverInstanceService).getUniverSheetInstance(params.unitId);
    const worksheet = workbook!.getSheetBySheetId(params.subUnitId);
    const old = worksheet!.getConfig().zoomRatio;
    return {
        ...Tools.deepClone(params),
        zoomRatio: old,
    };
};

export const SetZoomRatioOperation: IOperation<ISetZoomRatioOperationParams> = {
    id: 'sheet.operation.set-zoom-ratio',
    type: CommandType.OPERATION,
    handler: (accessor, params: ISetZoomRatioOperationParams) => {
        const workbook = accessor.get(IUniverInstanceService).getUniverSheetInstance(params.unitId);
        if (!workbook) {
            return false;
        }

        const worksheet = workbook.getSheetBySheetId(params.subUnitId);
        if (!worksheet) {
            return false;
        }

        worksheet.getConfig().zoomRatio = params.zoomRatio;

        return true;
    },
};
