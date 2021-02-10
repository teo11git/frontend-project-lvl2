import YAML from 'js-yaml';
import has from 'lodash/has';
const parsers = {
  json: JSON.parse,
  yaml: YAML.load,
};

export default ({ extension, content }) => {
  if (!has(parsers, extension)) {
    throw new Error('Invalid type of file');
  }
  let resultObject;
  try {
    resultObject = parsers[extension](content);
  } catch (err) {
    throw new Error('File is not valid!');
  }
  return resultObject;
};
