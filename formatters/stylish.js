import _ from 'lodash';

const renderValue = (value, tab) => {
  if (_.isPlainObject(value)){
    return Object.keys(value).map((key) => {
      const item = value[key];
      if (_.isPlainObject(item)) {
        return `${renderValue(item, `${tab}    `)}`;
      }
      return ` {\n${tab}    ${key}: ${item}\n${tab}    }`;
    }).join('');
  }
  if (_.isArray(value)) {
    return JSON.stringify(value);
  }
  return `${value}`;
}

const mapping = {
  added: (tab, key, originalValue, newValue) => 
    `${tab}+ ${key}: ${renderValue(newValue, tab)}\n`,
  removed: (tab, key, originalValue) => 
    `${tab}- ${key}: ${renderValue(originalValue, tab)}\n`,
  changed: (tab, key, originalValue, newValue) => 
    `${tab}- ${key}: ${renderValue(originalValue, tab)}\n${tab}+ ${key}: ${renderValue(newValue, tab)}\n`,
  stay: (tab, key, originalValue) => 
    `${tab}  ${key}: ${originalValue}\n`,
};

const prettify = (data, tab = '  ') => {
  // console.log(data);
  return Object.keys(data).map((key) => {
    // console.log(`>>key: ${key}`);
    // console.log(`>>value: ${value}`);
    const item = data[key];
    if (item.children !== null) {
      return `${tab}  ${key}: {\n${prettify(item.children, `${tab}    `)}${tab}  }\n`;
    }
    return mapping[item.state](
      tab,
      key,
      item.value,
      item.newValue
    );
  }).join('');
};

export default (data) => `{\n${prettify(data).slice(0, -1)}\n}`;
