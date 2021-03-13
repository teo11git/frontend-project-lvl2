import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import parse from './parsers.js';
import formatTo from './formatters/index.js';

const readFile = (filePath) => {
  const fullPath = path.resolve(filePath);
  return {
  data: fs.readFileSync(fullPath, 'utf-8').trim(),
  extension: path.parse(fullPath).ext.slice(1),
  };
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const object1 = parse(readFile(filepath1));
  const object2 = parse(readFile(filepath2));
  if (_.isEmpty(object1) || _.isEmpty(object2)) {
    return null;
  }
  if (_.isEqual(object1, object2)) {
    return null;
  }
  const countCommonKeys = _.intersection(Object.keys(object1), Object.keys(object2)).length;
  if (countCommonKeys === 0) {
    return null;
  }
  const ast = buildTree(object1, object2);
  return formatTo(formatName)(ast).trim();
};

export default genDiff;
