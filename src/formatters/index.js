import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';

const mapping = {
  json: (data) => JSON.stringify(data, null, '  '),
  stylish: formatToStylish,
  plain: formatToPlain,
};

export default (typeOfFormat) => mapping[typeOfFormat];
