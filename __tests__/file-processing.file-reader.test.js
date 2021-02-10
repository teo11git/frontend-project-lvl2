import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import readFile from '../file-processing/file-reader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const relativePath = `${__dirname}/../__fixtures__/example-file1.txt`;
const absolutePath = path.resolve(relativePath);

test('should read file by relative path', () => {
  expect(readFile(relativePath)).toEqual({ content: 'Hello!', extension: 'txt' });
});

test('should read file by absolute path', () => {
  expect(readFile(absolutePath)).toEqual({ content: 'Hello!', extension: 'txt' });
});

test('should throw error when path is incorrect', () => {
  expect(() => {
    readFile(relativePath.slice(-3));
  }).toThrow('Can not read file.\nPlease, check that path to file is correct');
});
