"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const REGEX = {
    isTrue: /^true$/i,
    isFalse: /^false$/i,
    customElement: /CustomElement$/,
    firstUppercase: /(^[A-Z])/,
    allUppercase: /([A-Z])/g,
    tr: /^\[tr\](.+)$/,
    html: /[&<>"'\/]/g,
    instr: /^\[([^\]]+)\](.*)$/
};
// export class ValType {
//   string : string = 'isString';
//   number : string = 'isNumber';
//   boolean : string = 'isBoolean';
//   null : string = 'isNull';
//   object : string = 'isObject';
//   array : string = 'isArray';
//   date : string = 'isDate';
//   any : string = 'isDefined';
//   integer : string = 'isInteger';
// }
// export enum ValType {
//   string = <any>'isString',
//   number = <any>'isNumber',
//   boolean = <any>'isBoolean',
//   null = <any>'isNull',
//   object = <any>'isObject',
//   array = <any>'isArray',
//   date = <any>'isDate',
//   any = <any>'isDefined',
//   integer = <any>'isInteger'
// }
class Util {
    constructor() {
        this._throw = false;
    }
    path(...path) {
        return this._resolvePath(...path);
    }
    static path(...path) {
        return new Util().path(...path);
    }
    src(src) {
        this._src = src;
        return this;
    }
    static src(src) {
        return new Util().src(src);
    }
    throw(v) {
        this._throw = v === true ? true : false;
        return this;
    }
    static throw(v) {
        return new Util().throw(v);
    }
    _getValue(val) {
        if (!this._path) {
            return val;
        }
        return this._resolveValue(val);
    }
    value(val) {
        if (this._path && this._path.length && Util.isDict(val)) {
            return this._resolveValue(val);
        }
        return val;
    }
    _resolvePath(...path) {
        let a = [];
        path.forEach(arg => {
            if (Util.isString(arg)) {
                arg = arg.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
                arg = arg.replace(/^\./, ''); // strip a leading dot
                const args = arg.split('.');
                a = [...a, ...args];
            }
            else if (Util.isArray(arg)) {
                a = [...a, ...arg];
            }
        });
        this._path = a;
        return this;
    }
    _resolveValue(obj) {
        let val = obj;
        for (let i = 0, n = this._path.length; i < n; ++i) {
            const k = this._path[i];
            if (val && k in val) {
                val = val[k];
            }
            else {
                if (this._throw) {
                    throw new Error(`Property ${this._path.join('.')} not found in ${this._src ? this._src : 'object'}`);
                }
                return;
            }
        }
        return val;
    }
    setValue(object, value) {
        let a = [];
        if (this._path && this._path.length && Util.isDict(object)) {
            let obj = object;
            const n = this._path.length;
            for (let i = 0; i < n; ++i) {
                const k = this._path[i];
                if (obj) {
                    if (!(k in obj)) {
                        obj[k] = {};
                    }
                    obj = obj[k];
                }
            }
            obj = value;
        }
    }
    isDict(val) {
        return Util.isDict(this._getValue(val));
    }
    static isDict(val) {
        if (!Util.isObject(val)) {
            return false;
        }
        return true;
    }
    isBoolean(val) {
        return Util.isBoolean(this._getValue(val));
    }
    static isBoolean(val) {
        return typeof val === 'boolean';
    }
    isString(val) {
        return Util.isString(this._getValue(val));
    }
    static isString(val) {
        return typeof val === 'string';
    }
    isNumber(val) {
        return Util.isNumber(this._getValue(val));
    }
    static isNumber(val) {
        return typeof val === 'number' && !isNaN(val);
    }
    isPosNumber(val) {
        return Util.isPosNumber(this._getValue(val));
    }
    /**
     * Is 1,2,3,4,...
     * @param val
     */
    static isPosNumber(val) {
        return typeof val === 'number' && !isNaN(val) && val > 0;
    }
    isInteger(val) {
        return Util.isInteger(this._getValue(val));
    }
    static isInteger(val) {
        return Util.isNumber(val) && Number.isInteger(val);
    }
    isNonEmptyString(val) {
        return Util.isNonEmptyString(this._getValue(val));
    }
    static isNonEmptyString(val) {
        return typeof val === 'string' && val.length > 0;
    }
    isFunction(val) {
        return Util.isFunction(this._getValue(val));
    }
    static isFunction(val) {
        return typeof val === 'function';
    }
    isDate(val) {
        return Util.isDate(this._getValue(val));
    }
    static isDate(val) {
        return val instanceof Date;
    }
    isArray(val) {
        return Util.isArray(this._getValue(val));
    }
    static isArray(val) {
        return Array.isArray(val);
    }
    isNonEmptyArray(val) {
        return Util.isNonEmptyArray(this._getValue(val));
    }
    static isNonEmptyArray(val) {
        return Array.isArray(val) && val.length > 0;
    }
    isRegExp(val) {
        return Util.isRegExp(this._getValue(val));
    }
    static isRegExp(val) {
        return val instanceof RegExp;
    }
    isNull(val) {
        return Util.isNull(this._getValue(val));
    }
    static isNull(val) {
        return val === null ? true : false;
    }
    isDefined(val) {
        return Util.isDefined(this._getValue(val));
    }
    static isDefined(val) {
        return val !== undefined;
    }
    /**
     * Is not undefined or null.
     * @param {*} obj
     */
    hasValue(val) {
        return Util.hasValue(this._getValue(val));
    }
    static hasValue(obj) {
        return obj !== null && obj !== undefined;
    }
    isEmpty(val) {
        return Util.isEmpty(this._getValue(val));
    }
    static isEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    isError(val) {
        return Util.isError(this._getValue(val));
    }
    static isError(val) {
        return val instanceof Error;
    }
    isObject(val) {
        return Util.isObject(this._getValue(val));
    }
    /**
     * An Object and NOT an array or Date
     * @param obj
     */
    static isObject(val) {
        return (val !== null &&
            typeof val === 'object' &&
            !Array.isArray(val) &&
            !(val instanceof Date) &&
            !(val instanceof RegExp));
    }
    /**
     * Careful using this method on minimized code where the name of the class might be changed
     * @param obj
     * @param name
     * @returns {*|boolean}
     */
    static isClass(obj, name) {
        return Util.isObject(obj) && obj.constructor.name === name;
    }
    static asError(...args) {
        let err;
        const msg = [];
        if (args.length) {
            args.forEach(arg => {
                if (arg instanceof Error) {
                    if (!err) {
                        err = arg;
                    }
                    msg.push(err.message);
                }
                else if (Util.isString(arg)) {
                    msg.push(arg);
                }
                else {
                    msg.push(String(arg));
                }
            });
            if (!err) {
                err = new Error(msg.join(' '));
            }
            else {
                err.message = msg.join(' ');
            }
        }
        return err;
    }
    static pick(obj, ...args) {
        // eslint-disable-line no-extend-native
        const result = {};
        if (Array.isArray(args[0])) {
            args = args[0];
        }
        args.forEach(key => {
            if (obj[key] !== undefined) {
                result[key] = obj[key];
            }
        });
        return result;
    }
    static omit(obj, ...args) {
        if (Array.isArray(args[0])) {
            args = args[0];
        }
        const keys = Object.keys(obj).filter(key => args.indexOf(key) < 0);
        const newObj = {};
        keys.forEach(k => {
            newObj[k] = obj[k];
        });
        return newObj;
    }
    // public static schemaTypeValidator(type: string) {
    //   return Util.VAL_MAP[type];
    // }
    static isTrue(val) {
        if (typeof val === 'number') {
            return val > 0 ? true : false;
        }
        else if (typeof val === 'string') {
            return val.length && !REGEX.isFalse.test(val) ? true : false;
        }
        else if (typeof val === 'boolean') {
            return val;
        }
        return false;
    }
    static isFalse(val) {
        if (typeof val === 'number') {
            return val === 0 ? true : false;
        }
        else if (typeof val === 'string') {
            return val.length && !REGEX.isTrue.test(val) ? true : false;
        }
        else if (typeof val === 'boolean') {
            return val;
        }
        return false;
    }
    static asFloat(val) {
        if (typeof val === 'number') {
            return val;
        }
        else if (Util.isNonEmptyString(val)) {
            return parseFloat(val);
        }
        return 0;
    }
    static asInteger(val) {
        if (typeof val === 'number') {
            return Number.isInteger(val) ? val : Math.round(val);
        }
        else if (Util.isNonEmptyString(val)) {
            return parseInt(val, 10);
        }
        return 0;
    }
    /**
     *
     * @param n {number} number to pad with leading zeros.
     * @param width {number} total width of string (eg. 3 for '005').
     * @param [z='0'] {char} character with which to pad string.
     * @returns {String}
     */
    static pad(n, width, z) {
        z = z || '0';
        const sn = String(n);
        return sn.length >= width ? sn : new Array(width - sn.length + 1).join(z) + sn;
    }
    /**
     * Float precision that returns a set number of digits after the decimal
     * @param {number} num - number to round
     * @param {number} dec - number of digits after decimal
     * @return {number} num rounded
     */
    static roundNumber(num, dec = 3) {
        const factor = Math.pow(10, dec);
        return Math.round(num * factor) / factor;
    }
    static deepCopy(a) {
        if (a === undefined || a === null) {
            return a;
        }
        else if (typeof a === 'number' || typeof a === 'string') {
            return a;
        }
        else if (a instanceof Date || a instanceof RegExp) {
            return a;
        }
        else if (Array.isArray(a)) {
            const result = [];
            for (const b of a) {
                result.push(b);
            }
            return result;
        }
        else if (Util.isObject(a)) {
            const result2 = {};
            Object.keys(a).forEach(key => {
                result2[key] = Util.deepCopy(a[key]);
            });
            return result2;
        }
        return a;
    }
    /**
     * Value comparator. Considers undefined, null, [] and {} to all be equal
     * @param a
     * @param b
     * @returns {boolean}
     */
    static deepEquals(a, b) {
        const aSet = Util.isSet(a);
        const bSet = Util.isSet(b);
        if (!aSet && !bSet) {
            return true;
        }
        if (!aSet || !bSet) {
            return false;
        }
        if (a === b || a.valueOf() === b.valueOf()) {
            return true;
        }
        if (Array.isArray(a) && a.length !== b.length) {
            return false;
        }
        // if they are dates, they must had equal valueOf
        if (a instanceof Date) {
            return false;
        }
        // if they are strictly equal, they both need to be object at least
        if (!(a instanceof Object)) {
            return false;
        }
        if (!(b instanceof Object)) {
            return false;
        }
        // recursive object equality check
        const ka = Object.keys(a);
        const kb = Object.keys(b);
        if (kb.length === ka.length) {
            return ka.every(k => {
                return Util.deepEquals(a[k], b[k]);
            });
        }
        return false;
    }
    static isSet(a) {
        if (a === null || a === undefined) {
            return false;
        }
        if (Array.isArray(a) && !a.length) {
            return false;
        }
        if (a instanceof Date) {
            return true;
        }
        if (a instanceof Object && !Object.keys(a).length) {
            return false;
        }
        return true;
    }
}
Util.ValType = {
    string: Util.isString,
    number: Util.isNumber,
    boolean: Util.isBoolean,
    null: Util.isNull,
    object: Util.isObject,
    array: Util.isArray,
    date: Util.isDate,
    any: Util.isDefined,
    integer: Util.isInteger
};
exports.Util = Util;
//# sourceMappingURL=index.js.map