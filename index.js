import * as fs from 'fs';
import * as path  from 'path';
import {default as _ } from 'lodash';
import { default as YAML } from 'js-yaml';

const makeMerge = (obj1, obj2) => {
  const clone1 = _.cloneDeep(obj1);
  _.merge(clone1, obj2);
  return clone1;
};

const calculateDelta = (obj1, obj2, merged) => {
 return  _.keys(merged).reduce((acc, key) => {
    const hasNoValue = 'special_no_key'
    const value1 = _.has(obj1, key) ? obj1[key] : hasNoValue;
    const value2 = _.has(obj2, key) ? obj2[key] : hasNoValue;
    if (value1 === hasNoValue) {
      return acc = { ...acc,  [key]: [value2, 'added'] };
    }
    if (value2 === hasNoValue) {
      return acc = { ...acc,  [key]: [value1, 'removed'] };
    }
    if (value1 === value2) {
      return acc = { ...acc,  [key]: [value1, 'stay'] };
    }
    if (value1 !== value2) {
      return acc = { ...acc,  [key]: [value1, value2, 'changed'] };
    }
  }, {});
};

const makeNormalOutput = (item) => {
  const tab = '  ';
  let [key, ...value] = item;
  value = value[0];
  const state = value[value.length - 1];
  switch (state) {
    case 'added':
      return `${tab}+ ${key}: ${value[0]}\n`;
    case 'removed':
      return `${tab}- ${key}: ${value[0]}\n`;
    case 'stay':
      return `${tab}  ${key}: ${value[0]}\n`;
    case 'changed':
      return `${tab}- ${key}: ${value[0]}\n${tab}+ ${key}: ${value[1]}\n`;
  }
}

const generateString = (obj) => {
  // in recursion version replace map to for in and function
  const result = _.entries(obj).map(makeNormalOutput);
  return `{\n${result.join('')}}`;
}

const getFile = (filepath) => {
  console.log(path.resolve(filepath));
  const data = {
    content: fs.readFileSync(filepath, 'utf-8'),
    ext: path.parse(filepath).ext.slice(1),
  };
  return data;
};

const parser = {
  json: JSON.parse,
  yaml: YAML.load,
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getFile(filepath1);
  const data2 = getFile(filepath2);
  const object1 = parser[data1.ext](data1.content);
  const object2 = parser[data2.ext](data2.content);
  const merged = makeMerge(object1, object2);
  const delta = calculateDelta(object1, object2, merged);
  const resultString = generateString(delta);
  return resultString;
};

export default genDiff;
