import _ from 'lodash';

const mapping = {
  added: (pathToProp, key, originalValue, newValue) => `Property ${pathToProp}${key} was added with value: ${newValue}\n`,
  removed: (pathToProp, key) => `Property ${pathToProp}${key} was removed\n`,
  changed: (pathToProp, key, originalValue, newValue) => `Property ${pathToProp}${key} was updated. From ${originalValue} to ${newValue}\n`,
  stay: () => '',
};
const renderer = (item) => (
  (_.isObject(item) || _.isArray(item))
  ? `[complex_value]`
  : item
);

const prettify = (data, pathToProp = '') => Object.entries(data).map(([k, v]) => {
  
  if (v.children !== null) {
    return `${prettify(v.children, `${pathToProp}${k}.`)}`;
  }
  return mapping[v.state](
    pathToProp,
    k,
    renderer(v.value),
    renderer(v.newValue)
  );
}).join('');
export default prettify;
