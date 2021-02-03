import { default as _ } from 'lodash';

const prettify = (data, pathToProp = '') => {
  let result = [];
  for (const [key, value] of Object.entries(data)) {
    if (!_.isPlainObject(value)) {
      const value1 = value[0];
      const value2 = value.length === 3 ? value[1] : undefined;
      const state = value[value.length - 1];
        switch (state) {
          case 'added':
            result.push(`Property ${pathToProp}${key} was added with value: ${value1}\n`);
            break;
          case 'removed':
            result.push(`Property ${pathToProp}${key} was removed\n`);
            break;
          case 'changed':
            result.push(`Property ${pathToProp}${key} was updated. From ${value1} to ${value2}\n`);
            break;
        }
      continue;
    }
    result.push(`${prettify(data[key], pathToProp + key + '.')}`);      
  }
  return result.join('');
}
export default prettify;
