import _ from 'lodash';
import calculateDelta from './compare-files/delta-fn.js';
import parse from './file-processing/parsers.js';
import getFile from './file-processing/file-reader.js';
import formatTo from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const object1 = parse(getFile(filepath1));
  const object2 = parse(getFile(filepath2));
  console.log('-------Object1----------');
  console.log(JSON.stringify(object1, null, ' '));
  console.log('---------Object2--------');
  console.log(JSON.stringify(object2, null, ' '));
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
  const deltaAST = calculateDelta(object1, object2);
  return formatTo(formatName)(deltaAST).trim();
};

export default genDiff;
