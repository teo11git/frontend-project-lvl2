import _ from 'lodash';

const mapping = {
  added: (pathToProp, key, oldValue, newValue) => `Property '${pathToProp}${key}' was added with value: ${newValue}\n`,
  removed: (pathToProp, key) => `Property '${pathToProp}${key}' was removed\n`,
  changed: (pathToProp, key, oldValue, newValue) => `Property '${pathToProp}${key}' was updated. From ${oldValue} to ${newValue}\n`,
  unchanged: () => '',
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

const prettify = (data, pathToProp = '') => Object.entries(data).map(([k, v]) => {
  if (v.children !== null) {
    return `${prettify(v.children, `${pathToProp}${k}.`)}`;
  }
  return mapping[v.state](
    pathToProp,
    k,
    renderer(v.oldValue),
    renderer(v.newValue),
  );
}).join('');
export default prettify;
