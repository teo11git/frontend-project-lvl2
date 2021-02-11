import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('should work with...', () => {
  test('input: nasted json, output: stylish', () => {
    const file1 = getFixturePath('nasted-file-1.json');
    const file2 = getFixturePath('nasted-file-2.json');
    const expectedOutput = readFile('nasted-file-output-stylish').trim();
    expect(genDiff(file1, file2)).toEqual(expectedOutput);
  });
  test('input: nasted yaml, output: plain', () => {
    const file1 = getFixturePath('nasted-file-1.yaml');
    const file2 = getFixturePath('nasted-file-2.yaml');
    const expectedOutput = readFile('nasted-file-output-plain').trim();
    expect(genDiff(file1, file2, 'plain')).toEqual(expectedOutput);
  });

test('input: nasted json, output: json', () => {
    const file1 = getFixturePath('nasted-file-1.json');
    const file2 = getFixturePath('nasted-file-2.json');
    const expectedOutput = readFile('nasted-diff-ast.json').trim();
    expect(genDiff(file1, file2, 'json')).toEqual(JSON.stringify(JSON.parse(expectedOutput)));
  });
});
