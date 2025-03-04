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

import type { LocaleType } from '@univerjs/core';
import { LocaleService } from '@univerjs/core';
import { ComponentManager } from '@univerjs/ui';
import { Inject, Injector } from '@wendellhu/redi';

import type { IUniverSlidesUIConfig } from '../basics';
import type { SlideContainer } from '../views/slide-container';
import { InfoBarUIController } from './info-bar-ui-controller';
import { SlideBarUIController } from './slide-bar-ui-controller';
import { ToolbarUIController } from './toolbar-ui-controller';

export class SlideContainerUIController {
    private _slideContainer?: SlideContainer;

    private _toolbarController: ToolbarUIController;

    private _infoBarController: InfoBarUIController;

    private _slideBarController: SlideBarUIController;

    private _config: IUniverSlidesUIConfig;

    constructor(
        config: IUniverSlidesUIConfig,
        @Inject(LocaleService) private readonly _localeService: LocaleService,
        @Inject(Injector) private readonly _injector: Injector,
        @Inject(ComponentManager) private readonly _componentManager: ComponentManager
    ) {
        this._config = config;
        this._toolbarController = this._injector.createInstance(
            ToolbarUIController,
            this._config.layout?.toolbarConfig
        );
        this._infoBarController = this._injector.createInstance(InfoBarUIController);
        this._slideBarController = this._injector.createInstance(SlideBarUIController);
        // this._dragManager = this._injector.createInstance(DragManager);
    }

    getUIConfig() {
        const config = {
            injector: this._injector,
            config: this._config,
            changeLocale: this.changeLocale,
            getComponent: this.getComponent,
            // 其余组件的props
            methods: {
                toolbar: {
                    getComponent: this._toolbarController.getComponent,
                },

                infoBar: {
                    getComponent: this._infoBarController.getComponent,
                },
                slideBar: {
                    getComponent: this._slideBarController.getComponent,
                    addSlide: this._slideBarController.addSlide,
                    activeSlide: this._slideBarController.activeSlide,
                },
            },
        };
        return config;
    }

    // 获取SlideContainer组件
    getComponent = (ref: SlideContainer) => {
        this._slideContainer = ref;
        this.setSlideContainer();
    };

    /**
     * Change language
     * @param {String} lang new language
     *
     * e: {target: HTMLSelectElement } reference from  https://stackoverflow.com/a/48443771
     *
     */
    changeLocale = (locale: string) => {
        this._localeService.setLocale(locale as LocaleType);
    };

    getContentRef() {
        return this._slideContainer!.getContentRef();
    }

    getToolbarController() {
        return this._toolbarController;
    }

    UIDidMount(cb: Function) {
        if (this._slideContainer) return cb(this._slideContainer);
    }

    private setSlideContainer() {
        // handle drag event
        const slideContainer = this._slideContainer!.getContentRef().current;
        if (!slideContainer) {
            throw new Error('slideContainer is not ready');
        }
    }
}
