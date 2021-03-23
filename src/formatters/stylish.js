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
  nested: (node, depth, iter) => `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1)}${indent(depth)}  }\n`,
};

const renderTree = (ast) => {
  const iter = (tree, depth) => {
    const result = tree.map((node) => mapping[node.type](node, depth, iter));
    return `${result.join('')}`;
  };
  return `{\n${iter(ast, 0)}}`;
};

export default renderTree;
