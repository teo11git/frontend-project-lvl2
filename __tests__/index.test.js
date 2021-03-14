import { test, expect, describe } from '@jest/globals';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import showDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const testList = ['json', 'yml'];
testList.forEach((inputFormat) => {
  describe(`Should work with ${inputFormat}`, () => {
    const outputFormats = ['stylish', 'plain', 'json'];
    const filePath1 = getFixturePath(`before.${inputFormat}`);
    const filePath2 = getFixturePath(`after.${inputFormat}`);
    outputFormats.forEach((outputFormat) => {
      test(`Output format is ${outputFormat}`, () => {
        const expectedOutput = readFile(`output_${outputFormat}`).trim();
        expect(showDiff(filePath1, filePath2, outputFormat)).toEqual(expectedOutput);
      });
    });
  });
});
