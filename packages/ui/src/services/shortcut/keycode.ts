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

// Useful keyboard event inspection tool https://www.toptal.com/developers/keycode

export const KeyCodeToChar: { [key: number]: string } = {
    [KeyCode.BACKSPACE]: 'Backspace',
    [KeyCode.TAB]: 'Tab',
    [KeyCode.ENTER]: 'Enter',
    [KeyCode.DELETE]: 'Del',
    [KeyCode.ESC]: 'Esc',
    [KeyCode.SPACE]: 'Space',
    [KeyCode.ARROW_LEFT]: '←',
    [KeyCode.ARROW_RIGHT]: '→',
    [KeyCode.ARROW_UP]: '↑',
    [KeyCode.ARROW_DOWN]: '↓',

    [KeyCode.Digit0]: '0',
    [KeyCode.Digit1]: '1',
    [KeyCode.Digit2]: '2',
    [KeyCode.Digit3]: '3',
    [KeyCode.Digit4]: '4',
    [KeyCode.Digit5]: '5',
    [KeyCode.Digit6]: '6',
    [KeyCode.Digit7]: '7',
    [KeyCode.Digit8]: '8',
    [KeyCode.Digit9]: '9',

    [KeyCode.A]: 'A',
    [KeyCode.B]: 'B',
    [KeyCode.C]: 'C',
    [KeyCode.D]: 'D',
    [KeyCode.E]: 'E',
    [KeyCode.F]: 'F',
    [KeyCode.G]: 'G',
    [KeyCode.H]: 'H',
    [KeyCode.I]: 'I',
    [KeyCode.J]: 'J',
    [KeyCode.K]: 'K',
    [KeyCode.L]: 'L',
    [KeyCode.M]: 'M',
    [KeyCode.N]: 'N',
    [KeyCode.O]: 'O',
    [KeyCode.P]: 'P',
    [KeyCode.Q]: 'Q',
    [KeyCode.R]: 'R',
    [KeyCode.S]: 'S',
    [KeyCode.T]: 'T',
    [KeyCode.U]: 'U',
    [KeyCode.V]: 'V',
    [KeyCode.W]: 'W',
    [KeyCode.X]: 'X',
    [KeyCode.Y]: 'Y',
    [KeyCode.Z]: 'Z',

    [KeyCode.MINUS]: '-',
    [KeyCode.EQUAL]: '=',
};

/** KeyCode that maps to browser standard keycode. */
export const enum KeyCode {
    UNKNOWN = 0,

    BACKSPACE = 8,
    TAB = 9,

    ENTER = 13,
    ESC = 27,
    SPACE = 32,

    ARROW_LEFT = 37,
    ARROW_UP = 38,
    ARROW_RIGHT = 39,
    ARROW_DOWN = 40,
    INSERT = 45,
    DELETE = 46,

    Digit0 = 48,
    Digit1,
    Digit2,
    Digit3,
    Digit4,
    Digit5,
    Digit6,
    Digit7,
    Digit8,
    Digit9,

    A = 65,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X,
    Y,
    Z,

    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
    NUM_LOCK = 144,
    SCROLL_LOCK = 145,

    MINUS = 189,
    EQUAL = 187,
}

export const enum MetaKeys {
    SHIFT = 1 << 10,
    /** Option key on MacOS. Alt key on other systems. */
    ALT = 1 << 11,
    /** Command key on MacOS. Ctrl key on other systems. */
    CTRL_COMMAND = 1 << 12,
    MAC_CTRL = 1 << 13,
}
