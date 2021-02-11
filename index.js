import calculateDelta from './compare-files/delta-generator.js';
import parse from './file-processing/parsers.js';
import getFile from './file-processing/file-reader.js';
import formatTo from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
    const object1 = parse(getFile(filepath1));
    const object2 = parse(getFile(filepath2));
    const deltaAST = calculateDelta(object1, object2);
    return (
      deltaAST === null
      ? 'There is no difference between files, or files don\'t have common names.'
      : formatTo(formatName)(deltaAST).trim()
    );
};

export default genDiff;
