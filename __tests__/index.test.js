import gendiff from '../index.js';
import fs from 'fs';
import path from 'path';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');

// to be continued
