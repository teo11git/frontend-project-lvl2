import _ from 'lodash';

const signMap = {
  added: '+',
  removed: '-',
  stay: ' ',
};

const prettify = (data, tab = '  ') => {
  return Object.entries(data).map(([key, value]) => {
    if (_.isPlainObject(value)) {
      return `${tab}  ${key}: {\n${prettify(data[key], `${tab}  `)}${tab}  }\n`;
    }
    const originalValue = value[0];
    const newValue = value.length === 3 ? value[1] : undefined;
    const state = value[value.length - 1];
    if (state === 'changed') {
      return `${tab}${signMap.removed} ${key}: ${originalValue}\n${tab}${signMap.added} ${key}: ${newValue}\n`;
    }
    return `${tab}${signMap[state]} ${key}: ${originalValue}\n`;
  }).join('');
};

export default (data) => `{\n${prettify(data).slice(0, -1)}\n}`;
