export type Dict = { [key: string]: any };

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

export class Util {
  public static ValType = {
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
  private _path?: string[];
  private _throw: boolean = false;
  private _obj?: Dict;
  private _src?: string;

  constructor() {}

  path(...path: string[]): this {
    return this._resolvePath(...path);
  }

  public static path(...path: string[]) {
    return new Util().path(...path);
  }

  src(src: string): this {
    this._src = src;
    return this;
  }

  public static src(src: string) {
    return new Util().src(src);
  }

  throw(v?: boolean) {
    this._throw = v === true ? true : false;
    return this;
  }

  public static throw(v?: boolean) {
    return new Util().throw(v);
  }

  private _getValue(val) {
    if (!this._path) {
      return val;
    }
    return this._resolveValue(val);
  }

  value(val: any): any {
    if (this._path && this._path.length && Util.isDict(val)) {
      return this._resolveValue(val);
    }
    return val;
  }

  protected _resolvePath(...path: (string | string[])[]) {
    let a: string[] = [];
    path.forEach(arg => {
      if (Util.isString(arg)) {
        arg = arg.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        arg = arg.replace(/^\./, ''); // strip a leading dot
        const args = arg.split('.');
        a = [...a, ...args];
      } else if (Util.isArray(arg)) {
        a = [...a, ...arg];
      }
    });
    this._path = a;
    return this;
  }

  protected _resolveValue(obj: Dict): any {
    let val = obj;
    for (let i = 0, n = this._path.length; i < n; ++i) {
      const k = this._path[i];
      if (val && k in val) {
        val = val[k];
      } else {
        if (this._throw) {
          throw new Error(
            `Property ${this._path.join('.')} not found in ${
              this._src ? this._src : 'object'
            }`
          );
        }
        return;
      }
    }
    return val;
  }

  setValue(object: Dict, value: any) {
    let a: any[] = [];
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

  isDict(val: any): val is Dict {
    return Util.isDict(this._getValue(val));
  }

  public static isDict(val: any): val is Dict {
    if (!Util.isObject(val)) {
      return false;
    }
    return true;
  }

  isBoolean(val: any): val is boolean {
    return Util.isBoolean(this._getValue(val));
  }

  public static isBoolean(val: any): val is boolean {
    return typeof val === 'boolean';
  }

  isString(val: any): val is string {
    return Util.isString(this._getValue(val));
  }

  public static isString(val: any): val is string {
    return typeof val === 'string';
  }

  isNumber(val: any): val is number {
    return Util.isNumber(this._getValue(val));
  }

  public static isNumber(val: any): val is number {
    return typeof val === 'number' && !isNaN(val);
  }

  isPosNumber(val: any): val is number {
    return Util.isPosNumber(this._getValue(val));
  }

  /**
   * Is 1,2,3,4,...
   * @param val
   */
  public static isPosNumber(val: any): val is number {
    return typeof val === 'number' && !isNaN(val) && val > 0;
  }

  isInteger(val: any): val is number {
    return Util.isInteger(this._getValue(val));
  }

  public static isInteger(val: any): val is number {
    return Util.isNumber(val) && Number.isInteger(val);
  }

  isNonEmptyString(val: any): val is number {
    return Util.isNonEmptyString(this._getValue(val));
  }

  public static isNonEmptyString(val: any): val is string {
    return typeof val === 'string' && val.length > 0;
  }

  isFunction(val: any): val is Function {
    return Util.isFunction(this._getValue(val));
  }

  public static isFunction(val: any) {
    return typeof val === 'function';
  }

  isDate(val: any): val is Date {
    return Util.isDate(this._getValue(val));
  }

  public static isDate(val: any): val is Date {
    return val instanceof Date;
  }

  isArray(val: any): val is [] {
    return Util.isArray(this._getValue(val));
  }

  public static isArray(val: any): val is [] {
    return Array.isArray(val);
  }

  isNonEmptyArray(val: any): val is [] {
    return Util.isNonEmptyArray(this._getValue(val));
  }

  public static isNonEmptyArray(val: any): val is [] {
    return Array.isArray(val) && val.length > 0;
  }

  isRegExp(val: any): val is RegExp {
    return Util.isRegExp(this._getValue(val));
  }

  public static isRegExp(val: any): val is RegExp {
    return val instanceof RegExp;
  }

  isNull(val: any): val is null {
    return Util.isNull(this._getValue(val));
  }

  public static isNull(val: any): val is null {
    return val === null ? true : false;
  }

  isDefined(val: any): val is any {
    return Util.isDefined(this._getValue(val));
  }

  public static isDefined(val: any) {
    return val !== undefined;
  }

  /**
   * Is not undefined or null.
   * @param {*} obj
   */
  hasValue(val: any) {
    return Util.hasValue(this._getValue(val));
  }

  public static hasValue(obj: any) {
    return obj !== null && obj !== undefined;
  }

  isEmpty(val: Dict) {
    return Util.isEmpty(this._getValue(val));
  }

  public static isEmpty(obj: Dict) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  isError(val: any): val is Error {
    return Util.isError(this._getValue(val));
  }

  public static isError(val: any): val is Error {
    return val instanceof Error;
  }

  isObject(val: any) {
    return Util.isObject(this._getValue(val));
  }

  /**
   * An Object and NOT an array or Date
   * @param obj
   */
  public static isObject(val: any) {
    return (
      val !== null &&
      typeof val === 'object' &&
      !Array.isArray(val) &&
      !(val instanceof Date) &&
      !(val instanceof RegExp)
    );
  }

  /**
   * Careful using this method on minimized code where the name of the class might be changed
   * @param obj
   * @param name
   * @returns {*|boolean}
   */
  public static isClass(obj: any, name: string) {
    return Util.isObject(obj) && obj.constructor.name === name;
  }

  public static asError(...args: any[]): Error {
    let err: Error | undefined;
    const msg: string[] = [];
    if (args.length) {
      args.forEach(arg => {
        if (arg instanceof Error) {
          if (!err) {
            err = arg;
          }
          msg.push(err.message);
        } else if (Util.isString(arg)) {
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

  public static pick(obj: Dict, ...args: any[]) {
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

  public static omit(obj: Dict, ...args: any[]) {
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

  // public static schemaTypeValidator(type: string) {
  //   return Util.VAL_MAP[type];
  // }

  public static isTrue(val: any): boolean {
    if (typeof val === 'number') {
      return val > 0 ? true : false;
    } else if (typeof val === 'string') {
      return val.length && !REGEX.isFalse.test(val) ? true : false;
    } else if (typeof val === 'boolean') {
      return val;
    }
    return false;
  }

  public static isFalse(val: any): boolean {
    if (typeof val === 'number') {
      return val === 0 ? true : false;
    } else if (typeof val === 'string') {
      return val.length && !REGEX.isTrue.test(val) ? true : false;
    } else if (typeof val === 'boolean') {
      return val;
    }
    return false;
  }

  public static asFloat(val: any): number {
    if (typeof val === 'number') {
      return val;
    } else if (Util.isNonEmptyString(val)) {
      return parseFloat(val);
    }
    return 0;
  }

  public static asInteger(val: any): number {
    if (typeof val === 'number') {
      return Number.isInteger(val) ? val : Math.round(val);
    } else if (Util.isNonEmptyString(val)) {
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
  public static pad(n: number, width: number, z: string): string {
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
  public static roundNumber(num: number, dec: number = 3): number {
    const factor = Math.pow(10, dec);
    return Math.round(num * factor) / factor;
  }

  public static deepCopy(a: any) {
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
    } else if (Util.isObject(a)) {
      const result2: Dict = {};
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
  public static deepEquals(a: any, b: any): boolean {
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

  public static isSet(a: any): boolean {
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

  /**
   * Verify that val is any one of the basic types or executes a RegExp against the val.
   * @param val
   * @param type {String|array of string} - To contain one or more entries from VAL_MAP as a string, array of strings or entries separated by '|'.
   * @returns {boolean} Returns true if val is one of type. If type is a RegExp then tests val against the RegExp.
   */
  //   public static validateType(val: any, ...types: ValType[]) {
  //     for (const t of types) {
  //       const fn = ValType[t];
  //       if (fn && Util[fn](val)) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   }

  //   public static validatePropertyType(
  //     obj: Dict,
  //     name: string,
  //     ...types: ValType[]
  //   ): boolean {
  //     if (obj) {
  //       return validateType(obj[name], ...types);
  //     }
  //     return false;
  //   }
  // }
}
