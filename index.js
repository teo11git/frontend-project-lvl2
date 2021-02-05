import * as fs from 'fs';
import * as path  from 'path';
import  _ from 'lodash';
import YAML from 'js-yaml';
import formatToStylish from './formatters/stylish-format.js';
import formatToPlain from './formatters/plain-format.js';
import getFile from './file-reader/file-reader.js';

const makeMerge = (obj1, obj2) => {
  const clone1 = _.cloneDeep(obj1);
  _.merge(clone1, obj2);
  return clone1;
};

const makeComparsion = (val1, val2, specialValue) => {
  if (val1 === specialValue) {
    return 'added';
  }
  if (val2 === specialValue) {
    return 'removed';
  }
  if (_.isEqual(val1, val2)) {
    return 'stay';
  }
  return 'changed';
};

const calculateDelta = (obj1, obj2, merged) => {
  const hasNoKey = 'special_no_key';
  return  _.keys(merged).reduce((acc, key) => {
    const value1 = _.has(obj1, key) ? obj1[key] : hasNoKey;
    const value2 = _.has(obj2, key) ? obj2[key] : hasNoKey;
    let state = makeComparsion(value1, value2, hasNoKey);
    if (!_.isPlainObject(value1) && !_.isPlainObject(value2)) {
      switch (state) {
        case 'added':
          acc[key] = [value2, state];
          break;
        case 'changed':
          acc[key] = [value1, value2, state];
          break;
        default:
          acc[key] = [value1, state];
      }
      return acc;
    }
    switch (state) {
      case 'changed':
        acc[key] = calculateDelta(obj1[key], obj2[key], merged[key]);
        break;
      default:
        acc[key] = [`[complex_value]`, state];
    }
    return acc;    
  }, {});
};

const formatters = {
  stylish: formatToStylish,
  plain: formatToPlain,
  json: JSON.stringify,
};

const parser = {
  json: JSON.parse,
  yaml: YAML.load,
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  try{ 
  const data1 = getFile(filepath1);
  const data2 = getFile(filepath2);
  const object1 = parser[data1.extension](data1.content);
  const object2 = parser[data2.extension](data2.content);
  const merged = makeMerge(object1, object2);
  const delta = calculateDelta(object1, object2, merged);
  const formatted = formatters[formatName](delta);
  return formatters[formatName](delta);
  } catch (e) {
    console.log(`[ERROR]`);
    console.log(e.message);
  }
};

export default genDiff;
