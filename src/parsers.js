import YAML from 'js-yaml';
import _ from 'lodash';

const parsers = {
  json: JSON.parse,
  yaml: YAML.load,
  yml: YAML.load,
};

export default ({ extension, content }) => parsers[extension](content);
