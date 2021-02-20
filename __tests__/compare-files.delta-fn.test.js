import { test, expect } from '@jest/globals';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import makeDelta from './src/compare-files/delta-fn.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('should work with nasted data', () => {
  const data1 = JSON.parse(readFile('nasted-file-1.json'));
  const data2 = JSON.parse(readFile('nasted-file-2.json'));
  const expectedAST = JSON.parse(readFile('nasted-ast.json'));
  expect(makeDelta(data1, data2)).toEqual(expectedAST);
});
