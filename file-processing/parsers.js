import YAML from 'js-yaml';

const parser = {
  json: JSON.parse,
  yaml: YAML.load,
};

export default ({ extension, content }) => {
  let resultObject;
  try {
    resultObject = parser[extension](content);
  } catch (err) {
    throw new Error('File is not valid!');
  }
  return resultObject;
};
