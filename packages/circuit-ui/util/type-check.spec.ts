/**
 * Copyright 2022, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  isArray,
  isFunction,
  isNil,
  isNumber,
  isObject,
  isString,
} from './type-check';

describe('type check', () => {
  describe('isFunction', () => {
    it('should return true for a function', () => {
      const actual = isFunction(jest.fn());
      expect(actual).toBeTruthy();
    });

    it('should return false for an object', () => {
      const actual = isFunction({});
      expect(actual).toBeFalsy();
    });

    it('should return false for an array', () => {
      const actual = isFunction([]);
      expect(actual).toBeFalsy();
    });

    it('should return false for a date', () => {
      const actual = isFunction(new Date());
      expect(actual).toBeFalsy();
    });

    it('should return false for null', () => {
      const actual = isFunction(null);
      expect(actual).toBeFalsy();
    });

    it('should return false for undefined', () => {
      const actual = isFunction(undefined);
      expect(actual).toBeFalsy();
    });
  });

  describe('isNumber', () => {
    it('should return true for an integer', () => {
      const actual = isNumber(1);
      expect(actual).toBeTruthy();
    });

    it('should return false for a string', () => {
      const actual = isNumber('');
      expect(actual).toBeFalsy();
    });

    it('should return false for an object', () => {
      const actual = isNumber({ foo: 'bar' });
      expect(actual).toBeFalsy();
    });

    it('should return false for an array of strings', () => {
      const actual = isNumber(['foo', 'bar']);
      expect(actual).toBeFalsy();
    });

    it('should return false for null', () => {
      const actual = isNumber(null);
      expect(actual).toBeFalsy();
    });

    it('should return false for undefined', () => {
      const actual = isNumber(undefined);
      expect(actual).toBeFalsy();
    });
  });

  describe('isString', () => {
    it('should return true for a string', () => {
      const actual = isString('');
      expect(actual).toBeTruthy();
    });

    it('should return false for an integer', () => {
      const actual = isString(1);
      expect(actual).toBeFalsy();
    });

    it('should return false for an object', () => {
      const actual = isString({ foo: 'bar' });
      expect(actual).toBeFalsy();
    });

    it('should return false for an array of strings', () => {
      const actual = isString(['foo', 'bar']);
      expect(actual).toBeFalsy();
    });

    it('should return false for null', () => {
      const actual = isString(null);
      expect(actual).toBeFalsy();
    });

    it('should return false for undefined', () => {
      const actual = isString(undefined);
      expect(actual).toBeFalsy();
    });
  });

  describe('isArray', () => {
    it('should return true for an array', () => {
      const actual = isArray([]);
      expect(actual).toBeTruthy();
    });

    it('should return false for an object', () => {
      const actual = isArray({ foo: 'bar' });
      expect(actual).toBeFalsy();
    });

    it('should return false for a function', () => {
      const actual = isArray(jest.fn());
      expect(actual).toBeFalsy();
    });

    it('should return false for null', () => {
      const actual = isArray(null);
      expect(actual).toBeFalsy();
    });

    it('should return false for undefined', () => {
      const actual = isArray(undefined);
      expect(actual).toBeFalsy();
    });
    it('should return false for string', () => {
      const actual = isArray('This is a string');
      expect(actual).toBeFalsy();
    });
    it('should return false for number', () => {
      const actual = isArray(123456);
      expect(actual).toBeFalsy();
    });
    it('should return false for bigint', () => {
      const actual = isArray(BigInt(1));
      expect(actual).toBeFalsy();
    });
    it('should return false for boolean', () => {
      const actual = isArray(false);
      expect(actual).toBeFalsy();
    });
    it('should return false for date', () => {
      const actual = isArray(new Date());
      expect(actual).toBeFalsy();
    });
    it('should return false for symbol', () => {
      const actual = isArray(Symbol(123456));
      expect(actual).toBeFalsy();
    });
  });

  describe('isObject', () => {
    it('should return true for an object', () => {
      const actual = isObject({});
      expect(actual).toBeTruthy();
    });

    it('should return false for an array', () => {
      const actual = isObject([]);
      expect(actual).toBeFalsy();
    });

    it('should return false for a function', () => {
      const actual = isObject(jest.fn());
      expect(actual).toBeFalsy();
    });

    it('should return false for null', () => {
      const actual = isObject(null);
      expect(actual).toBeFalsy();
    });

    it('should return false for undefined', () => {
      const actual = isObject(undefined);
      expect(actual).toBeFalsy();
    });
  });

  describe('isNil', () => {
    it('should return true for null', () => {
      const actual = isNil(null);
      expect(actual).toBeTruthy();
    });

    it('should return true for undefined', () => {
      const actual = isNil(undefined);
      expect(actual).toBeTruthy();
    });

    it('should return false for a boolean', () => {
      const actual = isNil(true);
      expect(actual).toBeFalsy();
    });

    it('should return false for a function', () => {
      const actual = isNil(jest.fn());
      expect(actual).toBeFalsy();
    });

    it('should return false for an integer', () => {
      const actual = isNil(1);
      expect(actual).toBeFalsy();
    });

    it('should return false for NaN', () => {
      const actual = isNil(NaN);
      expect(actual).toBeFalsy();
    });
  });
});
