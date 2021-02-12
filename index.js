import calculateDelta from './compare-files/delta-generator.js';
import parse from './file-processing/parsers.js';
import getFile from './file-processing/file-reader.js';
import formatTo from './formatters/index.js';
import _ from 'lodash';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const object1 = parse(getFile(filepath1));
  const object2 = parse(getFile(filepath2));
  if (_.isEqual(object1, object2)) {
    return 'There is no differense between files';
  }
  const countCommonKeys = _.intersection(Object.keys(object1), Object.keys(object2)).length;
  if (countCommonKeys === 0) {
    return 'Files do\'t have common keys';
  }
  console.log('-------------------');
  console.log(object1);
  console.log('---------------------');
  console.log(object2);
  const deltaAST = calculateDelta(object1, object2);
  return formatTo(formatName)(deltaAST).trim();
};

export default genDiff;
