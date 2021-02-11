import _ from 'lodash';

const prettify = (data, pathToProp = '') => {
  const result = [];
  for (const [key, value] of Object.entries(data)) {
    if (_.isPlainObject(value)) {
      result.push(`${prettify(data[key], `${pathToProp}${key}.`)}`);
    } else {
      const originalValue = value[0];
      const newValue = value.length === 3 ? value[1] : undefined;
      const state = value[value.length - 1];
      switch (state) {
        case 'added':
          result.push(`Property ${pathToProp}${key} was added with value: ${originalValue}\n`);
          break;
        case 'removed':
          result.push(`Property ${pathToProp}${key} was removed\n`);
          break;
        case 'changed':
          result.push(`Property ${pathToProp}${key} was updated. From ${originalValue} to ${newValue}\n`);
          break;
      }
    }
  }
  return result.join('');
};
export default prettify;
