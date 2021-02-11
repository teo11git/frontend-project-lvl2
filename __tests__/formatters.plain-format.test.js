import { test, expect } from '@jest/globals';
import formatToPlain from '../formatters/plain-format.js';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');


test('should work with plain object', () => {
  const incomingAST = JSON.parse(readFile('plain-diff-ast.json'));
  const expectedOutput = readFile('plain-file-output-plain');
  expect(formatToPlain(incomingAST)).toEqual(expectedOutput);
});

test('should worj with nasted object', () => {
  const incomingAST = JSON.parse(readFile('nasted-diff-ast.json'));
  const expectedOutput = readFile('nasted-file-output-plain');
  expect(formatToPlain(incomingAST)).toEqual(expectedOutput);
});
