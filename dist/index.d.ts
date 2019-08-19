export declare type Dict = {
    [key: string]: any;
};
export declare function isBoolean(val: any): val is boolean;
export declare function isString(val: any): val is string;
export declare function isNumber(val: any): val is number;
export declare function isInteger(val: any): val is number;
/**
 * Is 1, 2, 3, ...
 * @param val
 */
export declare function isPosInteger(val: any): val is number;
/**
 * Is > 0
 * @param val
 */
export declare function isPosNumber(val: any): val is number;
export declare function isNonEmptyString(val: any): val is string;
export declare function isFunction(val: any): boolean;
export declare function isDate(val: any): val is Date;
export declare function isArray(val: any): val is [];
export declare function isNonEmptyArray(val: any): val is [];
export declare function isRegExp(val: any): val is RegExp;
export declare function isNull(val: any): val is null;
export declare function isDefined(val: any): boolean;
export declare function isDict(val: any): val is Dict;
/**
 * Is not undefined or null.
 * @param val - The value to be tested
 */
export declare function hasValue(val: any): boolean;
export declare function isEmpty(obj: Dict): boolean;
export declare function isError(val: any): val is Error;
/**
 * An Object and NOT an array or Date
 * @param obj
 */
export declare function isObject(val: any): boolean;
export declare function pick(obj: Dict, ...args: any[]): Dict;
export declare function omit(obj: Dict, ...args: any[]): Dict;
export declare function isTrue(val: any): boolean;
export declare function isFalse(val: any): boolean;
export declare function asFloat(val: any): number;
export declare function asInteger(val: any): number;
/**
 *
 * @param n {number} number to pad with leading zeros.
 * @param width {number} total width of string (eg. 3 for '005').
 * @param [z='0'] {char} character with which to pad string.
 * @returns {String}
 */
export declare function pad(n: number, width: number, z?: string): string;
/**
 * Float precision that returns a set number of digits after the decimal
 * @param {number} num - number to round
 * @param {number} dec - number of digits after decimal
 * @return {number} num rounded
 */
export declare function roundNumber(num: number, dec?: number): number;
export declare function deepCopy(a: any): any;
/**
 * Value comparator. Considers undefined, null, [] and {} to all be equal
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function deepEquals(a: any, b: any): boolean;
export declare function asError(...args: any[]): Error;
/**
 * Careful using this method on minimized code where the name of the class might be changed
 * @param obj
 * @param name
 */
export declare function isClass(obj: any, name: string): boolean;
/**
 * Convert string of form 'myClass' to 'my-class'
 * @param str
 */
export declare function camelToDash(str: string): string;
/**
 * Verify that val is any one of the basic types.
 * @param val - The value to be tested
 * @param types
 */
export declare function isType(val: any, ...types: (string | string[])[]): boolean;
export declare function util(): Util;
export interface IUtilSource {
    toString(): string;
}
export declare type UtilOpts = {
    throw?: boolean;
    src?: string | IUtilSource;
};
export declare function object(val: any, opts?: UtilOpts): Util;
export declare class Util {
    private _path?;
    private _throw;
    private _val?;
    private _src?;
    constructor(val?: any, opts?: UtilOpts);
    property(...path: string[]): this;
    private source;
    throw(v?: boolean): this;
    value(): any;
    protected _resolvePath(...path: (string | string[])[]): this;
    setValue(object: Dict, value: any): void;
    isDict(): boolean;
    isBoolean(): boolean;
    isString(): boolean;
    isNumber(): boolean;
    isPosNumber(): boolean;
    isInteger(): boolean;
    isNonEmptyString(): boolean;
    isFunction(): boolean;
    isDate(): boolean;
    isArray(): boolean;
    isNonEmptyArray(): boolean;
    isRegExp(): boolean;
    isNull(): boolean;
    isDefined(): boolean;
    hasValue(): boolean;
    isEmpty(): boolean;
    isError(): boolean;
    isObject(): boolean;
    isType(...types: (string | string[])[]): boolean;
}
