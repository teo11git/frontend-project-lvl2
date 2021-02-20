import { test, expect, describe } from '@jest/globals';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import showDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Should work with json and yaml files with stylish mode', () => {
  const filepath1 = getFixturePath('nasted-file-1.json');
  const filepath2 = getFixturePath('nasted-file-2.yaml');
  const expectedOutput = readFile('output-stylish').trim();
  expect(showDiff(filepath1, filepath2, 'stylish')).toEqual(expectedOutput);
});
test('Should work with yaml and json file in plain mode', () => {
  const filepath1 = getFixturePath('nasted-file-1.yaml');
  const filepath2 = getFixturePath('nasted-file-2.json');
  const expectedOutput = readFile('output-plain').trim();
  expect(showDiff(filepath1, filepath2, 'plain')).toEqual(expectedOutput);
});
test('Second case. Files from Hexlet', () => {
  const filepath1 = getFixturePath('file3.json');
  const filepath2 = getFixturePath('file4.yml');
  const expectedOutput = readFile('output2').trim();
  expect(showDiff(filepath1, filepath2)).toEqual(expectedOutput)
});

describe('should return null in the following cases', () => {
  test('should return null, when object is equal', () => {
    const file1 = getFixturePath('nasted-file-1.json');
    const file2 = getFixturePath('nasted-file-1.json');
    expect(showDiff(file1, file2)).toBeNull();
  });
  test('return null, when object is empty', () => {
    const file1 = getFixturePath('nasted-file-1.json');
    const nullFile = getFixturePath('null.json');
    expect(showDiff(nullFile, file1)).toBeNull();
  });
  test('return null, when object don\'t have common keys', () => {
    const file1 = getFixturePath('nasted-file-1.json');
    const file2 = getFixturePath('sample.json');
    expect(showDiff(file1, file2)).toBeNull();
  });
});
