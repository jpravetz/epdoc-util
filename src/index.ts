export type Dict = { [key: string]: any };

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

export function isBoolean(val: any): val is boolean {
  return typeof val === 'boolean';
}

export function isString(val: any): val is string {
  return typeof val === 'string';
}

export function isNumber(val: any): val is number {
  return typeof val === 'number' && !isNaN(val);
}

export function isInteger(val: any): val is number {
  return isNumber(val) && Number.isInteger(val);
}

/**
 * Is 1, 2, 3, ...
 * @param val
 */
export function isPosInteger(val: any): val is number {
  return isInteger(val) && val > 0;
}

/**
 * Is > 0
 * @param val
 */
export function isPosNumber(val: any): val is number {
  return typeof val === 'number' && !isNaN(val) && val > 0;
}

export function isNonEmptyString(val: any): val is string {
  return typeof val === 'string' && val.length > 0;
}

export function isFunction(val: any) {
  return typeof val === 'function';
}

export function isDate(val: any): val is Date {
  return val instanceof Date;
}

export function isArray(val: any): val is [] {
  return Array.isArray(val);
}

export function isNonEmptyArray(val: any): val is [] {
  return Array.isArray(val) && val.length > 0;
}

export function isRegExp(val: any): val is RegExp {
  return val instanceof RegExp;
}

export function isNull(val: any): val is null {
  return val === null ? true : false;
}

export function isDefined(val: any) {
  return val !== undefined;
}
export function isDict(val: any): val is Dict {
  if (!isObject(val)) {
    return false;
  }
  return true;
}

/**
 * Is not undefined or null.
 * @param val - The value to be tested
 */
export function hasValue(val: any) {
  return val !== null && val !== undefined;
}

export function isEmpty(obj: Dict) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function isError(val: any): val is Error {
  return val instanceof Error;
}

/**
 * An Object and NOT an array or Date
 * @param obj
 */
export function isObject(val: any) {
  return (
    val !== null &&
    typeof val === 'object' &&
    !Array.isArray(val) &&
    !(val instanceof Date) &&
    !(val instanceof RegExp)
  );
}

export function pick(obj: Dict, ...args: any[]) {
  // eslint-disable-line no-extend-native
  const result: Dict = {};
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

export function omit(obj: Dict, ...args: any[]) {
  if (Array.isArray(args[0])) {
    args = args[0];
  }
  const keys = Object.keys(obj).filter(key => args.indexOf(key) < 0);
  const newObj: Dict = {};
  keys.forEach(k => {
    newObj[k] = obj[k];
  });
  return newObj;
}

// export function schemaTypeValidator(type: string) {
//   return Util.VAL_MAP[type];
// }

export function isTrue(val: any): boolean {
  if (typeof val === 'number') {
    return val > 0 ? true : false;
  } else if (typeof val === 'string') {
    return val.length && !REGEX.isFalse.test(val) ? true : false;
  } else if (typeof val === 'boolean') {
    return val;
  }
  return false;
}

export function isFalse(val: any): boolean {
  if (typeof val === 'number') {
    return val === 0 ? true : false;
  } else if (typeof val === 'string') {
    return val.length && !REGEX.isTrue.test(val) ? true : false;
  } else if (typeof val === 'boolean') {
    return val;
  }
  return false;
}

export function asFloat(val: any, defVal?: number): number {
  if (typeof val === 'number') {
    return val;
  } else if (isNonEmptyString(val)) {
    return parseFloat(val);
  }
  return isNumber(defVal) ? defVal : 0;
}

/**
 * Always returns a valid integer. Returns 0 if the val cannot be parsed or rounded to an integer.
 * @param val
 */
export function asInt(val: any): number {
  // for speed do this test first
  if (isNumber(val)) {
    return Number.isInteger(val) ? val : Math.round(val);
  } else if (isNonEmptyString(val)) {
    let v = parseFloat(val);
    if (isNumber(v)) {
      return Number.isInteger(v) ? v : Math.round(v);
    }
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
export function pad(n: number, width: number, z: string = '0'): string {
  const sn = String(n);
  return sn.length >= width ? sn : new Array(width - sn.length + 1).join(z) + sn;
}

/**
 * Float precision that returns a set number of digits after the decimal
 * @param {number} num - number to round
 * @param {number} dec - number of digits after decimal
 * @return {number} num rounded
 */
export function roundNumber(num: number, dec: number = 3): number {
  const factor = Math.pow(10, dec);
  return Math.round(num * factor) / factor;
}

export function deepCopy(a: any) {
  if (a === undefined || a === null) {
    return a;
  } else if (typeof a === 'number' || typeof a === 'string') {
    return a;
  } else if (a instanceof Date || a instanceof RegExp) {
    return a;
  } else if (Array.isArray(a)) {
    const result = [];
    for (const b of a) {
      result.push(b);
    }
    return result;
  } else if (isObject(a)) {
    const result2: Dict = {};
    Object.keys(a).forEach(key => {
      result2[key] = deepCopy(a[key]);
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
export function deepEquals(a: any, b: any): boolean {
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

function _isSet(a: any): boolean {
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

export function asError(...args: any[]): Error {
  let err: Error | undefined;
  const msg: string[] = [];
  if (args.length) {
    args.forEach(arg => {
      if (arg instanceof Error) {
        if (!err) {
          err = arg;
        }
        msg.push(err.message);
      } else if (isString(arg)) {
        msg.push(arg);
      } else {
        msg.push(String(arg));
      }
    });
    if (!err) {
      err = new Error(msg.join(' '));
    } else {
      err.message = msg.join(' ');
    }
  }
  return err as Error;
}

/**
 * Careful using this method on minimized code where the name of the class might be changed
 * @param obj
 * @param name
 */
export function isClass(obj: any, name: string): boolean {
  return isObject(obj) && obj.constructor.name === name;
}

/**
 * Convert string of form 'myClass' to 'my-class'
 * @param str
 */
export function camelToDash(str: string): string {
  return str
    .replace(REGEX.firstUppercase, ([first]) => first.toLowerCase())
    .replace(REGEX.allUppercase, ([letter]) => `-${letter.toLowerCase()}`);
}

/**
 * Verify that val is any one of the basic types.
 * @param val - The value to be tested
 * @param types
 */
export function isType(val: any, ...types: (string | string[])[]) {
  let util = new Util(val);
  return util.isType(...types);
}

export function util() {
  return new Util();
}

export interface IUtilSource {
  toString(): string;
}

export type UtilOpts = {
  throw?: boolean;
  src?: string | IUtilSource;
};

export function utilObj(val: any, opts?: UtilOpts) {
  return new Util(val, opts);
}

export class Util {
  private _path?: string[] = [];
  private _throw: boolean = false;
  private _val?: any;
  private _src?: IUtilSource;

  constructor(val?: any, opts: UtilOpts = {}) {
    this._val = val;
    this._throw = opts.throw === true ? true : false;
    this._src = opts.src;
  }

  /**
   * Resets property path. Otherwise each call to prop() will add to the end of
   * the path. Example obj.reset().prop('a').prop('b')
   */
  reset(): this {
    this._path = [];
    return this;
  }

  prop(...path: string[]): this {
    return this.property(...path);
  }

  property(...path: string[]): this {
    this._path = this._path.concat(this._resolvePath(...path));
    return this;
  }

  private source() {
    if (!this._src) {
      return 'object';
    }
    if (isString(this._src)) {
      return this._src;
    }
    return this._src.toString();
  }

  throw(v?: boolean) {
    this._throw = v === true ? true : false;
    return this;
  }

  val(): any {
    return this.value();
  }

  value(): any {
    let val = this._val;
    if (this._path.length) {
      for (let i = 0, n = this._path.length; i < n; ++i) {
        const k = this._path[i];
        if (val && k in val) {
          val = val[k];
        } else {
          if (this._throw) {
            throw new Error(`Property ${this._path.join('.')} not found in ${this.source()}`);
          }
          return;
        }
      }
    }
    return val;
  }

  protected _resolvePath(...path: (string | string[])[]): string[] {
    let a: string[] = [];
    path.forEach(arg => {
      if (isString(arg)) {
        arg = arg.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        arg = arg.replace(/^\./, ''); // strip a leading dot
        const args = arg.split('.');
        a = [...a, ...args];
      } else if (isArray(arg)) {
        a = [...a, ...arg];
      }
    });
    return a;
  }

  setVal(value: any): this {
    this.setValue(this._val, value);
    return this;
  }

  setValue(object: Dict, value: any): this {
    let a: any[] = [];
    if (this._path && this._path.length && isDict(object)) {
      let obj = object;
      const n = this._path.length;
      for (let i = 0; i < n; ++i) {
        const k = this._path[i];
        if (obj) {
          if (i >= n - 1) {
            if (isDict(obj)) {
              obj[k] = value;
            }
          } else {
            if (!(k in obj)) {
              obj[k] = {};
            }
            obj = obj[k];
          }
        }
      }
    }
    return this;
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

  isType(...types: (string | string[])[]) {
    let v = this.value();
    let ts = [];

    for (const t of types) {
      if (isNonEmptyString(t)) {
        ts = [...ts, ...t.trim().split(REGEX.typeSplit)];
      } else if (isArray(t)) {
        for (const t1 of t) {
          if (isNonEmptyString(t1)) {
            ts = [...ts, ...(t1 as string).split(REGEX.typeSplit)];
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
      } else {
        errors.push(t);
      }
    }
    if (errors.length) {
      throw new Error(`Invalid type [${errors.join(',')}]`);
    }
    return false;
  }
}
