export declare type Dict = {
    [key: string]: any;
};
export declare class Util {
    static ValType: {
        string: typeof Util.isString;
        number: typeof Util.isNumber;
        boolean: typeof Util.isBoolean;
        null: typeof Util.isNull;
        object: typeof Util.isObject;
        array: typeof Util.isArray;
        date: typeof Util.isDate;
        any: typeof Util.isDefined;
        integer: typeof Util.isInteger;
    };
    private _path?;
    private _throw;
    private _obj?;
    private _src?;
    constructor();
    path(...path: string[]): this;
    static path(...path: string[]): Util;
    src(src: string): this;
    static src(src: string): Util;
    throw(v?: boolean): this;
    static throw(v?: boolean): Util;
    private _getValue;
    value(val: any): any;
    protected _resolvePath(...path: (string | string[])[]): this;
    protected _resolveValue(obj: Dict): any;
    setValue(object: Dict, value: any): void;
    isDict(val: any): val is Dict;
    static isDict(val: any): val is Dict;
    isBoolean(val: any): val is boolean;
    static isBoolean(val: any): val is boolean;
    isString(val: any): val is string;
    static isString(val: any): val is string;
    isNumber(val: any): val is number;
    static isNumber(val: any): val is number;
    isPosNumber(val: any): val is number;
    /**
     * Is 1,2,3,4,...
     * @param val
     */
    static isPosNumber(val: any): val is number;
    isInteger(val: any): val is number;
    static isInteger(val: any): val is number;
    isNonEmptyString(val: any): val is number;
    static isNonEmptyString(val: any): val is string;
    isFunction(val: any): val is Function;
    static isFunction(val: any): boolean;
    isDate(val: any): val is Date;
    static isDate(val: any): val is Date;
    isArray(val: any): val is [];
    static isArray(val: any): val is [];
    isNonEmptyArray(val: any): val is [];
    static isNonEmptyArray(val: any): val is [];
    isRegExp(val: any): val is RegExp;
    static isRegExp(val: any): val is RegExp;
    isNull(val: any): val is null;
    static isNull(val: any): val is null;
    isDefined(val: any): val is any;
    static isDefined(val: any): boolean;
    /**
     * Is not undefined or null.
     * @param {*} obj
     */
    hasValue(val: any): boolean;
    static hasValue(obj: any): boolean;
    isEmpty(val: Dict): boolean;
    static isEmpty(obj: Dict): boolean;
    isError(val: any): val is Error;
    static isError(val: any): val is Error;
    isObject(val: any): boolean;
    /**
     * An Object and NOT an array or Date
     * @param obj
     */
    static isObject(val: any): boolean;
    /**
     * Careful using this method on minimized code where the name of the class might be changed
     * @param obj
     * @param name
     * @returns {*|boolean}
     */
    static isClass(obj: any, name: string): boolean;
    static asError(...args: any[]): Error;
    static pick(obj: Dict, ...args: any[]): Dict;
    static omit(obj: Dict, ...args: any[]): Dict;
    static isTrue(val: any): boolean;
    static isFalse(val: any): boolean;
    static asFloat(val: any): number;
    static asInteger(val: any): number;
    /**
     *
     * @param n {number} number to pad with leading zeros.
     * @param width {number} total width of string (eg. 3 for '005').
     * @param [z='0'] {char} character with which to pad string.
     * @returns {String}
     */
    static pad(n: number, width: number, z: string): string;
    /**
     * Float precision that returns a set number of digits after the decimal
     * @param {number} num - number to round
     * @param {number} dec - number of digits after decimal
     * @return {number} num rounded
     */
    static roundNumber(num: number, dec?: number): number;
    static deepCopy(a: any): any;
    /**
     * Value comparator. Considers undefined, null, [] and {} to all be equal
     * @param a
     * @param b
     * @returns {boolean}
     */
    static deepEquals(a: any, b: any): boolean;
    static isSet(a: any): boolean;
}
