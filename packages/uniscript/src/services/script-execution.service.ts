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

import { Disposable, ILogService } from '@univerjs/core';
import { FUniver } from '@univerjs/facade';
import { Inject, Injector } from '@wendellhu/redi';

/**
 * This service is to
 */
export class UniscriptExecutionService extends Disposable {
    constructor(
        @ILogService private readonly _logService: ILogService,
        @Inject(Injector) private readonly _injector: Injector
    ) {
        super();
    }

    async execute(code: string): Promise<boolean> {
        this._logService.log('[UniscriptExecutionService]', 'executing Uniscript...');

        const apiInstance = FUniver.newAPI(this._injector);
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        const scriptFunction = new Function('univerAPI', `(() => {${code}})()`);

        try {
            scriptFunction(apiInstance);
            return true;
        } catch (e) {
            this._logService.error(e);
            return false;
        }
    }
}
