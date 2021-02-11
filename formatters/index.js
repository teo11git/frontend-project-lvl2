import formatToStylish from './stylish-format.js';
import formatToPlain from './plain-format.js';

const mapping = {
  json: JSON.stringify,
  stylish: formatToStylish,
  plain: formatToPlain
};

export default (typeOfFormat) => mapping[typeOfFormat];
