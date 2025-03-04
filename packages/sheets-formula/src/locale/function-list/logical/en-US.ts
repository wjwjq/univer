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

export default {
    AND: {
        description: `Returns TRUE if all of its arguments are TRUE`,
        abstract: `Returns TRUE if all of its arguments are TRUE`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/and-function-5f19b2e8-e1df-4408-897a-ce285a19e9d9',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    BYCOL: {
        description: `Applies a&nbsp;LAMBDA&nbsp;to each column and returns an array of the results`,
        abstract: `Applies a&nbsp;LAMBDA&nbsp;to each column and returns an array of the results`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/bycol-function-58463999-7de5-49ce-8f38-b7f7a2192bfb',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    BYROW: {
        description: `Applies a&nbsp;LAMBDA&nbsp;to each row and returns an array of the results`,
        abstract: `Applies a&nbsp;LAMBDA&nbsp;to each row and returns an array of the results`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/byrow-function-2e04c677-78c8-4e6b-8c10-a4602f2602bb',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    FALSE: {
        description: `Returns the logical value FALSE`,
        abstract: `Returns the logical value FALSE`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/false-function-2d58dfa5-9c03-4259-bf8f-f0ae14346904',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    IF: {
        description: `Specifies a logical test to perform`,
        abstract: `Specifies a logical test to perform`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/if-function-69aed7c9-4e8a-4755-a9bc-aa8bbff73be2',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    IFERROR: {
        description: `Returns a value you specify if a formula evaluates to an error; otherwise, returns the result of the formula`,
        abstract: `Returns a value you specify if a formula evaluates to an error; otherwise, returns the result of the formula`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/iferror-function-c526fd07-caeb-47b8-8bb6-63f3e417f611',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    IFNA: {
        description: `Returns the value you specify if the expression resolves to #N/A, otherwise returns the result of the expression`,
        abstract: `Returns the value you specify if the expression resolves to #N/A, otherwise returns the result of the expression`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/ifna-function-6626c961-a569-42fc-a49d-79b4951fd461',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    IFS: {
        description: `Checks whether one or more conditions are met and returns a value that corresponds to the first TRUE condition.`,
        abstract: `Checks whether one or more conditions are met and returns a value that corresponds to the first TRUE condition.`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/ifs-function-36329a26-37b2-467c-972b-4a39bd951d45',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    LAMBDA: {
        description: `Use a LAMBDA function to create custom, reusable functions and call them by a friendly name. The new function is available throughout the workbook and called like native Excel functions.`,
        abstract: `Create custom, reusable functions and call them by a friendly name`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/lambda-function-bd212d27-1cd1-4321-a34a-ccbf254b8b67',
            },
        ],
        functionParameter: {
            parameter: {
                name: 'parameter',
                detail: 'A value that you want to pass to the function, such as a cell reference, string or number. You can enter up to 253 parameters. This argument is optional.',
            },
            calculation: {
                name: 'calculation',
                detail: 'The formula you want to execute and return as the result of the function. It must be the last argument and it must return a result. This argument is required.',
            },
        },
    },
    LET: {
        description: `Assigns names to calculation results`,
        abstract: `Assigns names to calculation results`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/let-function-34842dd8-b92b-4d3f-b325-b8b8f9908999',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    MAKEARRAY: {
        description: `Returns a&nbsp;calculated array of a specified row and column size, by applying a&nbsp;LAMBDA`,
        abstract: `Returns a&nbsp;calculated array of a specified row and column size, by applying a&nbsp;LAMBDA`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/makearray-function-b80da5ad-b338-4149-a523-5b221da09097',
            },
        ],
        functionParameter: {
            number1: { name: 'rows', detail: 'The number of rows in the array. Must be greater than zero.' },
            number2: { name: 'cols', detail: 'The number of columns in the array. Must be greater than zero.' },
            value3: {
                name: 'lambda',
                detail: ' A LAMBDA that is called to create the array. The LAMBDA takes two parameters: row (The row index of the array), col (The column index of the array).',
            },
        },
    },
    MAP: {
        description: `Returns an array&nbsp;formed by mapping&nbsp;each value in the array(s) to a new value by applying a&nbsp;LAMBDA&nbsp;to create a new value`,
        abstract: `Returns an array&nbsp;formed by mapping&nbsp;each value in the array(s) to a new value by applying a&nbsp;LAMBDA&nbsp;to create a new value`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/map-function-48006093-f97c-47c1-bfcc-749263bb1f01',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    NOT: {
        description: `Reverses the logic of its argument`,
        abstract: `Reverses the logic of its argument`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/not-function-9cfc6011-a054-40c7-a140-cd4ba2d87d77',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    OR: {
        description: `Returns TRUE if any argument is TRUE`,
        abstract: `Returns TRUE if any argument is TRUE`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/or-function-7d17ad14-8700-4281-b308-00b131e22af0',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    REDUCE: {
        description: `Reduces an array to an accumulated value by applying a&nbsp;LAMBDA&nbsp;to each value and returning the total value in the accumulator`,
        abstract: `Reduces an array to an accumulated value by applying a&nbsp;LAMBDA&nbsp;to each value and returning the total value in the accumulator`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/reduce-function-42e39910-b345-45f3-84b8-0642b568b7cb',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    SCAN: {
        description: `Scans&nbsp;an array by applying a&nbsp;LAMBDA&nbsp;to each value and returns an array that has each intermediate value`,
        abstract: `Scans&nbsp;an array by applying a&nbsp;LAMBDA&nbsp;to each value and returns an array that has each intermediate value`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/scan-function-d58dfd11-9969-4439-b2dc-e7062724de29',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    SWITCH: {
        description: `Evaluates an expression against a list of values and returns the result corresponding to the first matching value. If there is no match, an optional default value may be returned.`,
        abstract: `Evaluates an expression against a list of values and returns the result corresponding to the first matching value. If there is no match, an optional default value may be returned.`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/switch-function-47ab33c0-28ce-4530-8a45-d532ec4aa25e',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    TRUE: {
        description: `Returns the logical value TRUE`,
        abstract: `Returns the logical value TRUE`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/true-function-7652c6e3-8987-48d0-97cd-ef223246b3fb',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    XOR: {
        description: `Returns a logical exclusive OR of all arguments`,
        abstract: `Returns a logical exclusive OR of all arguments`,
        links: [
            {
                title: 'Instruction',
                url: 'https://support.microsoft.com/en-us/office/xor-function-1548d4c2-5e47-4f77-9a92-0533bba14f37',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
};
