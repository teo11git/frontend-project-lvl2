import _ from 'lodash';

const makeTabs = (indent) => `${' '.repeat(indent)}`;

const renderObject = (item, indent) => Object.entries(item).map(([key, value]) => {
  if (_.isPlainObject(value)) {
    return `${makeTabs(indent)}  ${key}: {\n${renderObject(item[key], indent + 4)}${makeTabs(indent)}  }\n`;
  }
  return `${makeTabs(indent)}  ${key}: ${value}\n`;
}).join('');

const renderer = (item, indent) => {
  if (_.isPlainObject(item)) {
    return `{\n${renderObject(item, indent + 4).slice(0, -1)}\n${makeTabs(indent)}  }`;
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

const prettify = (data, indent = 2) => Object.entries(data).map(([key, item]) => {
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
