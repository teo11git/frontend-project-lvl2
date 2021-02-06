import calculateDelta from './compare-files/delta-generator.js';
import parse from './file-processing/parsers.js';
import formatToStylish from './formatters/stylish-format.js';
import formatToPlain from './formatters/plain-format.js';
import getFile from './file-processing/file-reader.js';

const formatters = {
  stylish: formatToStylish,
  plain: formatToPlain,
  json: JSON.stringify,
  format: function(delta, formatName) { return this[formatName](delta) },
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  try{ 
    const object1 = parse(getFile(filepath1));
    const object2 = parse(getFile(filepath2));
    const delta = calculateDelta(object1, object2);
    return delta === null ? 'There is no difference between files.' : formatters.format(delta, formatName);
  } catch (e) {
    console.log(`[ERROR]`);
    console.log(e.message);
    console.log(e.stack);
  }
};

export default genDiff;
