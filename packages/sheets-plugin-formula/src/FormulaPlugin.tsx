import { SheetContext, IOCContainer, UniverSheet, Plugin, PLUGIN_NAMES } from '@univer/core';
import { CellExtensionManager, SheetPlugin } from '@univer/base-sheets';
import { FormulaEnginePlugin } from '@univer/base-formula-engine';
import { FormulaButton } from './UI/FormulaButton';
import { zh, en } from './Locale';

import { IConfig, IFormulaConfig } from './Basic/IFormula';
import { FORMULA_PLUGIN_NAME } from './Basic/PLUGIN_NAME';
import { FormulaController } from './Controller/FormulaController';
import { firstLoader } from './Controller/FirstLoader';
import { FormulaCellExtensionFactory } from './Basic/Register/FormulaCellExtension';

export class FormulaPlugin extends Plugin<any, SheetContext> {
    private _formulaController: FormulaController;

    constructor(private _config?: IFormulaConfig) {
        super(FORMULA_PLUGIN_NAME);
        // this._config = config || {};
    }

    static create(config: IFormulaConfig) {
        return new FormulaPlugin(config);
    }

    installTo(universheetInstance: UniverSheet) {
        universheetInstance.installPlugin(this);

        const context = this.getContext();
        let formulaEngine = context.getPluginManager().getPluginByName<FormulaEnginePlugin>('pluginFormulaEngine');
        if (!formulaEngine) {
            formulaEngine = new FormulaEnginePlugin();
            universheetInstance.installPlugin(formulaEngine);
        }

        this._formulaController = new FormulaController(this, this._config);

        this._formulaController.setFormulaEngine(formulaEngine);

        firstLoader(this._formulaController);
    }

    initialize(context: SheetContext): void {
        this.context = context;
        /**
         * load more Locale object
         */
        this.getContext().getLocale().load({
            en,
            zh,
        });

        const config: IConfig = { context };

        const item = {
            locale: FORMULA_PLUGIN_NAME,
            type: 0,
            show: true,
            label: <FormulaButton config={config} />,
        };
        context.getPluginManager().getPluginByName<SheetPlugin>(PLUGIN_NAMES.SPREADSHEET)?.addToolButton(item);

        this.registerExtension();
    }

    onMapping(IOC: IOCContainer): void {}

    onMounted(context: SheetContext): void {
        this.initialize(context);
    }

    onDestroy(): void {}

    registerExtension() {
        const register = CellExtensionManager.create();

        register.add(new FormulaCellExtensionFactory(this));
    }

    getFormulaEngine() {
        return this._formulaController.getFormulaEngine();
    }

    getFormulaController() {
        return this._formulaController;
    }
}
