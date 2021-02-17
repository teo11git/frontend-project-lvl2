import _ from 'lodash';

const makeTabs = (indent) => `${' '.repeat(indent)}`;

const renderer = (item, indent) => {
  if (_.isPlainObject(item)) {
    const result = Object.entries(item).map(([key, value]) => {
      if (_.isPlainObject(value)) {
        return `${renderer(item[key], indent + 4)}`;
      }
      return `${makeTabs(indent + 4)}  ${key}: ${value}\n`;
    }).join('');
    return `{\n${result}${makeTabs(indent)}  }`;
  }
  if (_.isArray(item)) {
    return `[${item.join(', ')}]`;
  }
  return `${item}`;
};

const mapping = {
  added: (indent, key, value, newValue) => `${makeTabs(indent)}+ ${key}: ${newValue}\n`,
  removed: (indent, key, value) => `${makeTabs(indent)}- ${key}: ${value}\n`,
  changed: (indent, key, value, newValue) => `${makeTabs(indent)}- ${key}: ${value}\n${makeTabs(indent)}+ ${key}: ${newValue}\n`,
  stay: (indent, key, value) => `${makeTabs(indent)}  ${key}: ${value}\n`,
};

const prettify = (data, indent = 2) => Object.keys(data).map((key) => {
  const item = data[key];
  if (item.children !== null) {
    return `${makeTabs(indent)}  ${key}: {\n${prettify(item.children, indent + 4)}${makeTabs(indent)}  }\n`;
  }
  return mapping[item.state](
    indent,
    key,
    renderer(item.value, indent),
    renderer(item.newValue, indent),
  );
}).join('');

export default (data) => `{\n${prettify(data).slice(0, -1)}\n}`;
