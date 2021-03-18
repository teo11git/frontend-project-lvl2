import YAML from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: YAML.load,
  yml: YAML.load,
};

export default (data, format) => parsers[format](data);
