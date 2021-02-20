import { test, expect } from '@jest/globals';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import formatToStylish from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('should work', () => {
  const ast = JSON.parse(readFile('nasted-ast.json'));
  const expectedOutput = readFile('output-stylish').trim();
  expect(formatToStylish(ast)).toEqual(expectedOutput);
});
