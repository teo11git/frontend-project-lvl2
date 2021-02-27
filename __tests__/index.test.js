import { test, expect } from '@jest/globals';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import showDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each`
fileName1        | fileName2      | fileNameOutput        | extension | outputFormat
${'before.json'} |${'after.json'} |${'output_stylish'}    |${'json'}  |${'stylish'}
${'before.json'} |${'after.json'} |${'output_plain'}      |${'json'}  |${'plain'}
${'before.json'} |${'after.json'} |${'output_json'}       |${'json'}  |${'json'}
${'before.yml'}  |${'after.yml'}  |${'output_stylish'}    |${'yml'}   |${'stylish'}
`('Should compare two $extension files. Output format is $outputFormat', ({
  fileName1, fileName2, fileNameOutput, outputFormat,
}) => {
  const filePath1 = getFixturePath(fileName1);
  const filePath2 = getFixturePath(fileName2);
  const outputString = readFile(fileNameOutput).trim();
  expect(showDiff(filePath1, filePath2, outputFormat)).toEqual(outputString);
});
