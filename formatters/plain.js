import _ from 'lodash';

const mapping = {
  added: (pathToProp, key, originalValue) => 
    `Property ${pathToProp}${key} was added with value: ${originalValue}\n`,
  removed: (pathToProp, key) =>
    `Property ${pathToProp}${key} was removed\n`,
  changed: (pathToProp, key, originalValue, newValue) =>
    `Property ${pathToProp}${key} was updated. From ${originalValue} to ${newValue}\n`,
  stay: () => '',
};

const prettify = (data, pathToProp = '') => {
  return Object.entries(data).map(([key, value]) => {
    //console.log(`>>key: ${key}`);
    //console.log(`>>value: ${value}`);
    if (_.isPlainObject(value)) {
      return `${prettify(data[key], `${pathToProp}${key}.`)}`;
    }
    const state = value[value.length - 1];
    return mapping[state](
      pathToProp,
      key,
      value[0],
      value.length === 3 ? value[1] : undefined
    );
  }).join('');
};
export default prettify;
