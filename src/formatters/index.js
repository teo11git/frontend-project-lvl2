import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';

const mapping = {
  json: JSON.stringify,
  stylish: formatToStylish,
  plain: formatToPlain,
};

export default (typeOfFormat) => mapping[typeOfFormat];
