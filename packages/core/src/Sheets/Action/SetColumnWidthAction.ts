import { SetColumnWidth } from '../Apply';
import { Workbook } from '../Domain';
import { SheetAction, ISheetActionData } from '../../Command/SheetAction';
import { ActionObservers, ActionType } from '../../Command/ActionObservers';

/**
 * @internal
 */
export interface ISetColumnWidthActionData extends ISheetActionData {
    columnIndex: number;
    columnWidth: number[];
}

/**
 * Set the column width according to the specified column index
 *
 * @internal
 */
export class SetColumnWidthAction extends SheetAction<ISetColumnWidthActionData> {
    constructor(
        actionData: ISetColumnWidthActionData,
        workbook: Workbook,
        observers: ActionObservers
    ) {
        super(actionData, workbook, observers);
        this._doActionData = {
            ...actionData,
            convertor: [],
        };
        this._oldActionData = {
            ...actionData,
            columnWidth: this.do(),
            convertor: [],
        };
        this.validate();
    }

    do(): number[] {
        const worksheet = this.getWorkSheet();

        const result = SetColumnWidth(
            this._doActionData.columnIndex,
            this._doActionData.columnWidth,
            worksheet.getColumnManager()
        );

        this._observers.notifyObservers({
            type: ActionType.REDO,
            data: this._doActionData,
            action: this,
        });

        return result;
    }

    redo(): void {
        this.do();
    }

    undo(): number[] {
        const worksheet = this.getWorkSheet();

        const result = SetColumnWidth(
            this._oldActionData.columnIndex,
            this._oldActionData.columnWidth,
            worksheet.getColumnManager()
        );

        this._observers.notifyObservers({
            type: ActionType.UNDO,
            data: this._oldActionData,
            action: this,
        });

        return result;
    }

    validate(): boolean {
        return false;
    }
}
