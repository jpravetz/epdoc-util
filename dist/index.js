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
    instr: /^\[([^\]]+)\](.*)$/,
    typeSplit: /\s*[,\|]{1}\s*/
};
function isBoolean(val) {
    return typeof val === 'boolean';
}
exports.isBoolean = isBoolean;
function isString(val) {
    return typeof val === 'string';
}
exports.isString = isString;
function isNumber(val) {
    return typeof val === 'number' && !isNaN(val);
}
exports.isNumber = isNumber;
function isInteger(val) {
    return isNumber(val) && Number.isInteger(val);
}
exports.isInteger = isInteger;
/**
 * Is 1, 2, 3, ...
 * @param val
 */
function isPosInteger(val) {
    return isInteger(val) && val > 0;
}
exports.isPosInteger = isPosInteger;
/**
 * Is > 0
 * @param val
 */
function isPosNumber(val) {
    return typeof val === 'number' && !isNaN(val) && val > 0;
}
exports.isPosNumber = isPosNumber;
function isNonEmptyString(val) {
    return typeof val === 'string' && val.length > 0;
}
exports.isNonEmptyString = isNonEmptyString;
function isFunction(val) {
    return typeof val === 'function';
}
exports.isFunction = isFunction;
function isDate(val) {
    return val instanceof Date;
}
exports.isDate = isDate;
function isArray(val) {
    return Array.isArray(val);
}
exports.isArray = isArray;
function isNonEmptyArray(val) {
    return Array.isArray(val) && val.length > 0;
}
exports.isNonEmptyArray = isNonEmptyArray;
function isRegExp(val) {
    return val instanceof RegExp;
}
exports.isRegExp = isRegExp;
function isNull(val) {
    return val === null ? true : false;
}
exports.isNull = isNull;
function isDefined(val) {
    return val !== undefined;
}
exports.isDefined = isDefined;
function isDict(val) {
    if (!isObject(val)) {
        return false;
    }
    return true;
}
exports.isDict = isDict;
/**
 * Is not undefined or null.
 * @param val - The value to be tested
 */
function hasValue(val) {
    return val !== null && val !== undefined;
}
exports.hasValue = hasValue;
function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
exports.isEmpty = isEmpty;
function isError(val) {
    return val instanceof Error;
}
exports.isError = isError;
/**
 * An Object and NOT an array or Date
 * @param obj
 */
function isObject(val) {
    return (val !== null &&
        typeof val === 'object' &&
        !Array.isArray(val) &&
        !(val instanceof Date) &&
        !(val instanceof RegExp));
}
exports.isObject = isObject;
function pick(obj, ...args) {
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
exports.pick = pick;
function omit(obj, ...args) {
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
exports.omit = omit;
// export function schemaTypeValidator(type: string) {
//   return Util.VAL_MAP[type];
// }
function isTrue(val) {
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
exports.isTrue = isTrue;
function isFalse(val) {
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
exports.isFalse = isFalse;
function asFloat(val, defVal) {
    if (typeof val === 'number') {
        return val;
    }
    else if (isNonEmptyString(val)) {
        return parseFloat(val);
    }
    return isNumber(defVal) ? defVal : 0;
}
exports.asFloat = asFloat;
/**
 * Always returns a valid integer. Returns 0 if the val cannot be parsed or rounded to an integer.
 * @param val
 */
function asInt(val) {
    // for speed do this test first
    if (isNumber(val)) {
        return Number.isInteger(val) ? val : Math.round(val);
    }
    else if (isNonEmptyString(val)) {
        let v = parseFloat(val);
        if (isNumber(v)) {
            return Number.isInteger(v) ? v : Math.round(v);
        }
    }
    return 0;
}
exports.asInt = asInt;
/**
 *
 * @param n {number} number to pad with leading zeros.
 * @param width {number} total width of string (eg. 3 for '005').
 * @param [z='0'] {char} character with which to pad string.
 * @returns {String}
 */
function pad(n, width, z = '0') {
    const sn = String(n);
    return sn.length >= width ? sn : new Array(width - sn.length + 1).join(z) + sn;
}
exports.pad = pad;
/**
 * Float precision that returns a set number of digits after the decimal
 * @param {number} num - number to round
 * @param {number} dec - number of digits after decimal
 * @return {number} num rounded
 */
function roundNumber(num, dec = 3) {
    const factor = Math.pow(10, dec);
    return Math.round(num * factor) / factor;
}
exports.roundNumber = roundNumber;
function deepCopy(a) {
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
    else if (isObject(a)) {
        const result2 = {};
        Object.keys(a).forEach(key => {
            result2[key] = deepCopy(a[key]);
        });
        return result2;
    }
    return a;
}
exports.deepCopy = deepCopy;
/**
 * Value comparator. Considers undefined, null, [] and {} to all be equal
 * @param a
 * @param b
 * @returns {boolean}
 */
function deepEquals(a, b) {
    const aSet = _isSet(a);
    const bSet = _isSet(b);
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
            return deepEquals(a[k], b[k]);
        });
    }
    return false;
}
exports.deepEquals = deepEquals;
function _isSet(a) {
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
function asError(...args) {
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
            else if (isString(arg)) {
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
exports.asError = asError;
/**
 * Careful using this method on minimized code where the name of the class might be changed
 * @param obj
 * @param name
 */
function isClass(obj, name) {
    return isObject(obj) && obj.constructor.name === name;
}
exports.isClass = isClass;
/**
 * Convert string of form 'myClass' to 'my-class'
 * @param str
 */
function camelToDash(str) {
    return str
        .replace(REGEX.firstUppercase, ([first]) => first.toLowerCase())
        .replace(REGEX.allUppercase, ([letter]) => `-${letter.toLowerCase()}`);
}
exports.camelToDash = camelToDash;
/**
 * Verify that val is any one of the basic types.
 * @param val - The value to be tested
 * @param types
 */
function isType(val, ...types) {
    let util = new Util(val);
    return util.isType(...types);
}
exports.isType = isType;
function util() {
    return new Util();
}
exports.util = util;
function utilObj(val, opts) {
    return new Util(val, opts);
}
exports.utilObj = utilObj;
class Util {
    constructor(val, opts = {}) {
        this._path = [];
        this._throw = false;
        this._val = val;
        this._throw = opts.throw === true ? true : false;
        this._src = opts.src;
    }
    /**
     * Resets property path. Otherwise each call to prop() will add to the end of
     * the path. Example obj.reset().prop('a').prop('b')
     */
    reset() {
        this._path = [];
        return this;
    }
    prop(...path) {
        return this.property(...path);
    }
    property(...path) {
        this._path = this._path.concat(this._resolvePath(...path));
        return this;
    }
    source() {
        if (!this._src) {
            return 'object';
        }
        if (isString(this._src)) {
            return this._src;
        }
        return this._src.toString();
    }
    throw(v) {
        this._throw = v === true ? true : false;
        return this;
    }
    val() {
        return this.value();
    }
    value() {
        let val = this._val;
        if (this._path.length) {
            for (let i = 0, n = this._path.length; i < n; ++i) {
                const k = this._path[i];
                if (val && k in val) {
                    val = val[k];
                }
                else {
                    if (this._throw) {
                        throw new Error(`Property ${this._path.join('.')} not found in ${this.source()}`);
                    }
                    return;
                }
            }
        }
        return val;
    }
    _resolvePath(...path) {
        let a = [];
        path.forEach(arg => {
            if (isString(arg)) {
                arg = arg.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
                arg = arg.replace(/^\./, ''); // strip a leading dot
                const args = arg.split('.');
                a = [...a, ...args];
            }
            else if (isArray(arg)) {
                a = [...a, ...arg];
            }
        });
        return a;
    }
    setValue(object, value) {
        let a = [];
        if (this._path && this._path.length && isDict(object)) {
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
    asBoolean() {
        return isTrue(this.value());
    }
    asInt() {
        return asInt(this.value());
    }
    asFloat() {
        return asFloat(this.value());
    }
    asString() {
        return String(this.value());
    }
    isDict() {
        return isDict(this.value());
    }
    isBoolean() {
        return isBoolean(this.value());
    }
    isString() {
        return isString(this.value());
    }
    isNumber() {
        return isNumber(this.value());
    }
    isPosNumber() {
        return isPosNumber(this.value());
    }
    isInteger() {
        return isInteger(this.value());
    }
    isNonEmptyString() {
        return isNonEmptyString(this.value());
    }
    isFunction() {
        return isFunction(this.value());
    }
    isDate() {
        return isDate(this.value());
    }
    isArray() {
        return isArray(this.value());
    }
    isNonEmptyArray() {
        return isNonEmptyArray(this.value());
    }
    isRegExp() {
        return isRegExp(this.value());
    }
    isNull() {
        return isNull(this.value());
    }
    isDefined() {
        return isDefined(this.value());
    }
    hasValue() {
        return hasValue(this.value());
    }
    isEmpty() {
        return isEmpty(this.value());
    }
    isError() {
        return isError(this.value());
    }
    isObject() {
        return isObject(this.value());
    }
    isType(...types) {
        let v = this.value();
        let ts = [];
        for (const t of types) {
            if (isNonEmptyString(t)) {
                ts = [...ts, ...t.trim().split(REGEX.typeSplit)];
            }
            else if (isArray(t)) {
                for (const t1 of t) {
                    if (isNonEmptyString(t1)) {
                        ts = [...ts, ...t1.split(REGEX.typeSplit)];
                    }
                }
            }
        }
        let ts2 = [];
        for (const t of ts) {
            if (isString(t)) {
                let s = t.trim();
                if (s.length) {
                    ts2.push(s);
                }
            }
        }
        let errors = [];
        for (const t of ts2) {
            let fn = 'is' + t.charAt(0).toUpperCase() + t.slice(1);
            if (isFunction(this[fn])) {
                if (this[fn](v)) {
                    return true;
                }
            }
            else {
                errors.push(t);
            }
        }
        if (errors.length) {
            throw new Error(`Invalid type [${errors.join(',')}]`);
        }
        return false;
    }
}
exports.Util = Util;
//# sourceMappingURL=index.js.map