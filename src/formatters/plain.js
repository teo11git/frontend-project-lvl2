import _ from 'lodash';

const mapping = {
  added: (pathToProp, key, oldValue, newValue) => `Property '${pathToProp}${key}' was added with value: ${newValue}\n`,
  removed: (pathToProp, key) => `Property '${pathToProp}${key}' was removed\n`,
  changed: (pathToProp, key, oldValue, newValue) => `Property '${pathToProp}${key}' was updated. From ${oldValue} to ${newValue}\n`,
  unchanged: () => '',
  modified: (pathToProp, key, oldValue, newValue, children, prettiFn) => `${prettiFn(children, `${pathToProp}${key}.`)}`,
};

const renderer = (item) => {
  if (_.isObject(item) || _.isArray(item)) {
    return '[complex value]';
  }
  if (_.isString(item)) {
    return `'${item}'`;
  }
  return item;
};

const prettify = (data, pathToProp = '') => (
  data.map(({
    state, key, oldValue, newValue, children,
  }) => mapping[state](
    pathToProp,
    key,
    renderer(oldValue),
    renderer(newValue),
    children,
    prettify,
  )).join('')
);
export default prettify;
