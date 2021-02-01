import { default as _ } from 'lodash';

const sign = {
  added: '+',
  removed: '-',
  stay: ' ',
};

const prettify = (data, arg1, arg2, tab = '  ') => {
  let result = [];
  for (const item of Object.entries(data)) {
    const [key, value] = item;
    if (!_.isPlainObject(value)) {
      const value1 = value[0];
      const value2 = value.length === 3 ? value[1] : undefined;
      const state = value[value.length - 1];
        switch (state) {
          case 'changed':
            result.push(`${tab}- ${key}: ${value1}\n${tab}+ ${key}: ${value2}\n`);
            break;
          default:
            result.push(`${tab}${sign[state]} ${key}: ${value1}\n`);
        }
      continue;
    }
    result.push(`${tab}  ${key}: {\n${prettify(data[key], arg1, arg2, tab += '  ')}${tab}}\n`);      
  }
  return result.join('');
}
export default (data) => `{\n${prettify(data).slice(0, -1)}\n}` ;
