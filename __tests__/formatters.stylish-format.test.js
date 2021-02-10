import { test, expect } from '@jest/globals';
import makeStylish from '../formatters/stylish-format.js';

test('should work with plain object', () => {
  const incomingObject = {
    name0: ['value0', 'stay'],
    name1: ['value1', 'removed'],
    name2: ['value2', 'someValue', 'changed'],
    name3: ['value3', 'added'],
  };
  const expectedOutput = `{
    name0: value0
  - name1: value1
  - name2: value2
  + name2: someValue
  + name3: value3
}`;
  expect(makeStylish(incomingObject)).toEqual(expectedOutput);
});

test('should work with nasted object', () => {
  const incomingObject = {
    name0: ['value0', 'stay'],
    name1: {
      name0: ['value0', 'removed'],
    },
    name2: {
      name0: ['value0', 'stay'],
      name1: {
        name0: ['value0', 'someValue', 'changed'],
      },
    },
    name3: {
      name0: ['value0', 'stay'],
      name1: ['value1', 'added'],
    },
  };
  const expectedOutput = `{
    name0: value0
    name1: {
    - name0: value0
    }
    name2: {
      name0: value0
      name1: {
      - name0: value0
      + name0: someValue
      }
    }
    name3: {
      name0: value0
    + name1: value1
    }
}`;
  expect(makeStylish(incomingObject)).toEqual(expectedOutput);
});
