import * as fs from 'fs';
import * as path  from 'path';
import * as _ from 'lodash';
import { default as YAML } from 'js-yaml';

const getFile = (filepath) => {
  console.log(path.resolve(filepath));
  const data = {
    file: fs.readFileSync(filepath, 'utf-8'),
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
  const object1 = parser[data1.ext](data1.file);
  const object2 = parser[data2.ext](data2.file);
};
// genDiff();
export default genDiff;
