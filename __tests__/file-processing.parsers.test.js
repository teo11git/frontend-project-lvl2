import { test, expect, describe } from '@jest/globals';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import parse from '../file-processing/parsers.js';

const expectedObject = {
  name0: 'value0',
  name1: {
    name0: 'value0',
  },
  name2: {
    name0: {
      name0: 'value0',
      name1: 'value1',
    },
    name1: 687,
  },
  name3: {
    name0: 'value0',
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Should work with JSON file', () => {
  const data = readFile('nasted-file-1.json');
  expect(parse({ content: data, extension: 'json' }))
    .toEqual(expectedObject);
});

test('should worj with YAML file', () => {
  const data = readFile('nasted-file-1.yaml');
  expect(parse({ content: data, extension: 'yaml' }))
    .toEqual(expectedObject);
});

describe('work with errors', () => {
  test('should throw error, when extension is not right', () => {
    const data = readFile('nasted-file-1.json');
    expect(() => {
      parse({ content: data, extension: 'txt' });
    }).toThrow('Unsupported type of file');
  });
  test('should throw error, when file is invalid', () => {
    const data = readFile('nasted-file-1.json').slice(10);
    expect(() => {
      parse({ content: data, extension: 'json' });
    }).toThrow('File is not valid!');
  });
});
