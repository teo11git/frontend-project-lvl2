import { test, expect, describe } from '@jest/globals';
import cloneDeep from 'lodash/cloneDeep';
import makeDelta from '../compare-files/delta-generator.js';

describe('Simple workig cases', () => {
  test('should find removed names', () => {
    const obj1 = { name: 'toRemove' };
    const obj2 = {};
    expect(makeDelta(obj1, obj2)).toEqual({ name: ['toRemove', 'removed'] });
  });
  test('should find added names', () => {
    const obj1 = {};
    const obj2 = { name: 'newValue' };
    expect(makeDelta(obj1, obj2)).toEqual({ name: ['newValue', 'added'] });
  });

  test('should find keeped names', () => {
    const obj1 = { name: 'value', secondName: 'toDelete' };
    const obj2 = { name: 'value' };
    expect(makeDelta(obj1, obj2)).toEqual({
      name: ['value', 'stay'],
      secondName: ['toDelete', 'removed'],
    });
  });

  test('should find changed names', () => {
    const obj1 = { name: 'toChange' };
    const obj2 = { name: 'value' };
    expect(makeDelta(obj1, obj2)).toEqual({ name: ['toChange', 'value', 'changed'] });
  });
});

test('should work with plain objects', () => {
  const obj1 = {
    firstName: 'value',
    secondName: 'toDelete',
    thirdName: 'toChange',
  };
  const obj2 = cloneDeep(obj1);
  delete obj2.secondName;
  obj2.thirdName = 'newValue';
  obj2.fourName = 'someValue';
  const expectedObject = {
    firstName: ['value', 'stay'],
    secondName: ['toDelete', 'removed'],
    thirdName: ['toChange', 'newValue', 'changed'],
    fourName: ['someValue', 'added'],
  };
  expect(makeDelta(obj1, obj2)).toEqual(expectedObject);
});

test('should work with nasted objects', () => {
  const obj1 = {
    firstName: 'value',
    secondName: {
      name1: 'val',
      name2: 'val2',
    },
    thirdName: {
      name1: 'value1',
      name2: {
        name1: 'value1',
        name2: 'value2',
      },
    },
    fourName: {
      name1: 'value1',
    },
  };

  const obj2 = cloneDeep(obj1);
  delete obj2.secondName;
  obj2.thirdName.name2.name1 = 'someValue';
  obj2.fourName.name2 = 'someValue2';

  const expectedObject = {
    firstName: ['value', 'stay'],
    secondName: ['[complex_value]', 'removed'],
    thirdName: {
      name1: ['value1', 'stay'],
      name2: {
        name1: ['value1', 'someValue', 'changed'],
        name2: ['value2', 'stay'],
      },
    },
    fourName: {
      name1: ['value1', 'stay'],
      name2: ['someValue2', 'added'],
    },
  };
  expect(makeDelta(obj1, obj2)).toEqual(expectedObject);
});
