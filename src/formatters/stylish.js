import _ from 'lodash';

const indent = (depth, spaceCount = 4) => {
  const indentCount = depth * spaceCount;
  return '.'.repeat(indentCount < 0 ? 0 : indentCount);
};

const stringify = (data, depth) => {
  console.log('start stringify');
  console.log(data);
  if(!(_.isPlainObject(data))) {
    console.log('Just write data');
    return `${data}`;
  };
  console.log('start render nested object');
  const result = Object.entries(data).map(([key, value]) => `${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`);
  return `/\n${result.join('\n')}\n${indent(depth)}>>/`  
};

const mapping = {
  added: (node, depth) => {
    console.log('from added');
    console.log(node.newValue);
    return `${indent(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}\n`
  },
  removed: (node, depth) => `${indent(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}\n`,
  changed: (node, depth) => `${indent(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}\n${indent(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}\n`,
  unchanged: (node, depth) => `${indent(depth)}!!${node.key}: ${stringify(node.oldValue, depth)}\n`,
  nasted: (node, depth, iter) => {
    return `${indent(depth)}  ${node.key}: $\n${iter(node.children, depth + 1)}${indent(depth)}<<$\n`;    
  },
};

const renderTree = (ast) => {
  const iter = (tree, depth) => {
    console.log('Start!!!');
    const result = tree.map((node) => {
      console.log(node);
      return mapping[node.type](node, depth, iter);
    });
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
