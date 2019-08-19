import {
  isBoolean,
  isString,
  isNumber,
  isNonEmptyString,
  isArray,
  isPosNumber,
  isInteger,
  isFunction,
  isNull,
  isDefined,
  hasValue,
  isRegExp,
  isDate,
  deepEquals,
  pick,
  omit,
  isObject,
  isError,
  object as t,
  isType,
  camelToDash,
  pad
} from '../dist';

describe('util', () => {
  describe('type', () => {
    const obj = {
      a: 'b',
      c: 'd',
      e: 4
    };

    it('isString', () => {
      expect(isString('string')).toBe(true);
      expect(
        t({ a: 'string' })
          .property('a')
          .isString()
      ).toBe(true);
      expect(
        t({ a: { b: 'string' } })
          .property('a.b')
          .isString()
      ).toBe(true);
      expect(
        t({ a: { b: 'string' } })
          .property('a.c')
          .isString()
      ).toBe(false);
      expect(isString(4)).toBe(false);
    });

    it('isNonEmptyString', () => {
      let s = 'my string';
      expect(isNonEmptyString(s)).toBe(true);
      expect(s).toEqual('my string');
      expect(isNonEmptyString('')).toBe(false);
      expect(isNonEmptyString(null)).toBe(false);
      expect(isNonEmptyString(4)).toBe(false);
    });

    it('isArray', () => {
      expect(isArray(['string'])).toBe(true);
      expect(isArray(4)).toBe(false);
      expect(isArray({ a: 'string' })).toBe(false);
    });

    it('isBoolean', () => {
      expect(isBoolean(false)).toBe(true);
      expect(isBoolean(undefined)).toBe(false);
    });

    it('isNumber', () => {
      expect(isNumber(4)).toBe(true);
      expect(isNumber(NaN)).toBe(false);
      expect(isNumber({})).toBe(false);
    });

    it('isPosNumber', () => {
      expect(isPosNumber(4)).toBe(true);
      expect(isPosNumber(NaN)).toBe(false);
      expect(isPosNumber(-0.01)).toBe(false);
      expect(isPosNumber(0)).toBe(false);
    });

    it('isInteger', () => {
      expect(isInteger(4)).toBe(true);
      expect(isInteger(NaN)).toBe(false);
      expect(isInteger(0.2)).toBe(false);
      expect(isInteger(0)).toBe(true);
      expect(isInteger(-1)).toBe(true);
    });

    it('isFunction', () => {
      expect(isFunction({})).toBe(false);
      expect(isFunction(3)).toBe(false);
      expect(isFunction(false)).toBe(false);
      expect(isFunction(() => {})).toBe(true);
    });

    it('isNull', () => {
      expect(isNull(null)).toBe(true);
      expect(isNull(false)).toBe(false);
      expect(isNull(() => {})).toBe(false);
    });

    it('isDefined', () => {
      expect(isDefined(null)).toBe(true);
      expect(isDefined(undefined)).toBe(false);
      expect(isDefined(false)).toBe(true);
      expect(isDefined(() => {})).toBe(true);
    });

    it('hasValue', () => {
      expect(hasValue('test')).toBe(true);
      expect(hasValue(NaN)).toBe(true);
      expect(hasValue(0.2)).toBe(true);
      expect(hasValue(0)).toBe(true);
      expect(hasValue(undefined)).toBe(false);
      expect(hasValue(null)).toBe(false);
      expect(hasValue({})).toBe(true);
    });

    it('isRegExp', () => {
      expect(isRegExp(/^.*$/)).toBe(true);
      expect(isRegExp({})).toBe(false);
      expect(isRegExp(false)).toBe(false);
      expect(isRegExp(Date.now())).toBe(false);
      expect(isRegExp(() => {})).toBe(false);
    });

    it('isObject', () => {
      expect(isObject(/^.*$/)).toBe(false);
      expect(isObject({})).toBe(true);
      expect(isObject([])).toBe(false);
      expect(isObject(false)).toBe(false);
      expect(isRegExp(Date.now())).toBe(false);
      expect(isObject(() => {})).toBe(false);
      expect(isObject(undefined)).toBe(false);
    });

    it('isDate', () => {
      expect(isDate(/^.*$/)).toBe(false);
      expect(isDate({})).toBe(false);
      expect(isDate(false)).toBe(false);
      expect(isDate(233433)).toBe(false);
      expect(isDate(new Date())).toBe(true);
      expect(isDate(() => {})).toBe(false);
    });

    it('isError', () => {
      expect(isError(/^.*$/)).toBe(false);
      expect(isError({})).toBe(false);
      expect(isError(false)).toBe(false);
      expect(isError(new Error())).toBe(true);
      expect(isError(() => {})).toBe(false);
    });
    it('isType', () => {
      expect(isType('string', 'string')).toBe(true);
      expect(isType(false, 'string|number')).toBe(false);
      expect(isType(false, ' string,number,  boolean')).toBe(true);
      expect(isType(34, ' string,boolean', 'number')).toBe(true);
      expect(isType(34, ' string,boolean', ['number'])).toBe(true);
      expect(isType({}, ' string,boolean', ['number'])).toBe(false);
      expect(isType({}, 'object')).toBe(true);
      expect(isType(34, 'date')).toBe(false);
      expect(() => {
        isType(34, 'xxx,yyy');
      }).toThrow('Invalid type [xxx,yyy]');
      expect(isType(new Date(), 'date')).toBe(true);
    });
    it('isType property', () => {
      expect(
        t({ a: 3 })
          .property('a')
          .isType('number')
      ).toBe(true);
      expect(
        t({ a: 3 })
          .property('a')
          .isType('string')
      ).toBe(false);
      expect(
        t({ a: { b: 3 } })
          .property('a.b')
          .isType('string|number')
      ).toBe(true);
      expect(() => {
        t({ a: { b: 3 } }, { throw: true })
          .property('a.c')
          .isType('string|number');
      }).toThrow('Property a.c not found in object');
      expect(() => {
        t({ a: { b: 3 } }, { throw: true, src: 'test' })
          .property('a.c')
          .isType('string|number');
      }).toThrow('Property a.c not found in test');
    });
  });

  describe('object', () => {
    it('value', () => {
      expect(
        t({ a: { b: 3 } })
          .property('a.b')
          .value()
      ).toBe(3);
    });
  });

  describe('deep', () => {
    const obj = {
      a: 'b',
      c: 'd',
      e: 4
    };
    it('pick and deepEquals', () => {
      let result1 = deepEquals(pick(obj, 'a', 'e'), { a: 'b', e: 4 });
      expect(result1).toBe(true);
      let result2 = deepEquals(pick(obj, 'a', 'e'), { a: 'b', e: 5 });
      expect(result2).toBe(false);
      let result3 = deepEquals(pick(obj, ['a', 'c']), { a: 'b', c: 'd' });
      expect(result3).toBe(true);
    });

    it('omit and deepEquals', () => {
      let result1 = deepEquals(omit(obj, 'a', 'e'), { c: 'd' });
      expect(result1).toBe(true);
      let result2 = deepEquals(omit(obj, 'e'), { a: 'b', c: 'd' });
      expect(result2).toBe(true);
      let result3 = deepEquals(omit(obj, ['a', 'c']), { e: 4 });
      expect(result3).toBe(true);
      let result4 = deepEquals(omit(obj, 'e'), { a: 'b', c: 'f' });
      expect(result4).toBe(false);
    });
  });

  describe('translate', () => {
    it('camelToDash', () => {
      expect(camelToDash('myStringHere')).toEqual('my-string-here');
      expect(camelToDash('MyStringHere')).toEqual('my-string-here');
    });
    it('pad', () => {
      expect(pad(32, 4)).toEqual('0032');
      expect(pad(32, 4, 'a')).toEqual('aa32');
      expect(pad(32, 2)).toEqual('32');
    });
  });
});
