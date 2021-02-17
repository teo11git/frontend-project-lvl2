import { test, expect } from '@jest/globals';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import formatToPlain from '../formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Should work with nasted data', () => {
  const ast = JSON.parse(readFile('nasted-ast.json'));
  const expectedOut = readFile('output-plain');
  expect(formatToPlain(ast)).toEqual(expectedOut);
});
