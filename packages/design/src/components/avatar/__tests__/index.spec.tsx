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

import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, test } from 'vitest';

import { Avatar } from '../Avatar';

describe('Avatar', () => {
    test('renders correctly', () => {
        const { container } = render(<Avatar size="small">Jane Doe</Avatar>);
        expect(container);
    });

    test('renders the children', () => {
        const { getByText } = render(<Avatar>Test</Avatar>);
        const childrenElement = getByText('Test');
        expect(childrenElement).not.toBeNull();
    });

    test('renders the image', () => {
        const { container } = render(<Avatar src="test.png" />);

        expect(container.querySelector('img')).not.toBeNull();
    });
});
