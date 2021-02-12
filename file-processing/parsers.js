import YAML from 'js-yaml';
import _ from 'lodash';

const parsers = {
  json: JSON.parse,
  yaml: YAML.load,
  yml: YAML.load
};

export default ({ extension, content }) => {
  if (!_.has(parsers, extension)) {
    throw new Error('Unsupported type of file');
  }
  let resultObject;
  try {
    resultObject = parsers[extension](content);
  } catch (err) {
    throw new Error('File is not valid!');
  }
  return resultObject;
};
