import _ from 'lodash';

const mapping = {
  added: (tab, key, originalValue) => 
    `${tab}+ ${key}: ${originalValue}\n`,
  removed: (tab, key, originalValue) => 
    `${tab}- ${key}: ${originalValue}\n`,
  changed: (tab, key, originalValue, newValue) => 
    `${tab}- ${key}: ${originalValue}\n${tab}+ ${key}: ${newValue}\n`,
  stay: (tab, key, originalValue) => 
    `${tab}  ${key}: ${originalValue}\n`,
};

const prettify = (data, tab = '  ') => {
  return Object.entries(data).map(([key, value]) => {
    if (_.isPlainObject(value)) {
      return `${tab}  ${key}: {\n${prettify(data[key], `${tab}  `)}${tab}  }\n`;
    }
    const originalValue = value[0];
    const newValue = value.length === 3 ? value[1] : undefined;
    const state = value[value.length - 1];
    return mapping[state](
      tab,
      key,
      value[0],
      value.length === 3 ? value[1] : undefined
    );
  }).join('');
};

export default (data) => `{\n${prettify(data).slice(0, -1)}\n}`;
