import { test, expect, describe } from '@jest/globals';
import formatToStylish from '../formatters/stylish.js';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('should work', () => {
  const ast = JSON.parse(readFile('nasted-ast.json'));
  const expectedOutput = readFile('output-stylish');
  expect(formatToStylish(ast)).toEqual(expectedOutput);
});

