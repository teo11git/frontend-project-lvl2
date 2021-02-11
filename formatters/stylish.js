import _ from 'lodash';

const signMap = {
  added: '+',
  removed: '-',
  stay: ' ',
};

const prettify = (data, tab = '  ') => {
  const result = [];
  for (const item of Object.entries(data)) {
    const [key, value] = item;
    if (_.isPlainObject(value)) {
      result.push(`${tab}  ${key}: {\n${prettify(data[key], `${tab}  `)}${tab}  }\n`);
    } else {
      const originalValue = value[0];
      const newValue = value.length === 3 ? value[1] : undefined;
      const state = value[value.length - 1];
      switch (state) {
        case 'changed':
          result.push(
            `${tab}${signMap.removed} ${key}: ${originalValue}\n${tab}${signMap.added} ${key}: ${newValue}\n`,
          );
          break;
        default:
          result.push(`${tab}${signMap[state]} ${key}: ${originalValue}\n`);
      }
    }
  }
  return result.join('');
};
export default (data) => `{\n${prettify(data).slice(0, -1)}\n}`;
