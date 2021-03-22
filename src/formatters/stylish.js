import _ from 'lodash';

const indent = (depth, spaceCount = 4) => {
  const indentCount = depth * spaceCount + 2;
  return ' '.repeat(indentCount);
};

const stringify = (data, depth) => {
  if (!(_.isPlainObject(data))) {
    return `${data}`;
  }
  const result = Object.entries(data).map(([key, value]) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${result.join('\n')}\n${indent(depth)}  }`;
};

const mapping = {
  added: (node, depth) => `${indent(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}\n`,
  removed: (node, depth) => `${indent(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}\n`,
  changed: (node, depth) => `${indent(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}\n${indent(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}\n`,
  unchanged: (node, depth) => `${indent(depth)}  ${node.key}: ${stringify(node.oldValue, depth)}\n`,
  nasted: (node, depth, iter) => `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1)}${indent(depth)}  }\n`,
};

const renderTree = (ast) => {
  const iter = (tree, depth) => {
    const result = tree.map((node) => mapping[node.type](node, depth, iter));
    return `${result.join('')}`;
  };
  return `{\n${iter(ast, 0)}}`;
};

export default renderTree;

/*
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
  added: (indent, key, oldValue, newValue) => `${makeTabs(indent)}+ ${key}: ${newValue}\n`,
  removed: (indent, key, oldValue) => `${makeTabs(indent)}- ${key}: ${oldValue}\n`,
  changed: (indent, key, oldValue, newValue) => `${makeTabs(indent)}- ${key}: ${oldValue}\n${makeTabs(indent)}+ ${key}: ${newValue}\n`,
  unchanged: (indent, key, oldValue) => `${makeTabs(indent)}  ${key}: ${oldValue}\n`,
  nasted: (indent, key, oldValu, newValue, children, prettiFn) => `${makeTabs(indent)}  ${key}: {\n${prettiFn(children, indent + 4)}${makeTabs(indent)}  }\n`,
};

const prettify = (data, indent = 2) => (
  data.map(({
    type, key, oldValue, newValue, children,
  }) => mapping[type](
    indent,
    key,
    renderer(oldValue, indent),
    renderer(newValue, indent),
    children,
    prettify,
  )).join('')
);

export default (data) => `{\n${prettify(data).slice(0, -1)}\n}`;
*/
