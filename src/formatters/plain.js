import _ from 'lodash';

const stringify = (item) => {
  if (_.isObject(item) || _.isArray(item)) {
    return '[complex value]';
  }
  if (_.isString(item)) {
    return `'${item}'`;
  }
  return item;
};

const mapping = {
  added: (node, pathToProp) => `Property '${pathToProp}${node.key}' was added with value: ${stringify(node.newValue)}`,
  removed: (node, pathToProp) => `Property '${pathToProp}${node.key}' was removed`,
  changed: (node, pathToProp) => `Property '${pathToProp}${node.key}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`,
  unchanged: () => '',
  nested: (node, pathToProp, iter) => `${iter(node.children, `${pathToProp}${node.key}.`)}`,
};

const makeRender = (ast) => {
  const iter = (tree, pathToProp) => {
    const result = tree.map((node) => mapping[node.type](node, pathToProp, iter));
    return `${result.filter((item) => item).join('\n')}`;
  };
  return `${iter(ast, '')}`;
};

export default makeRender;
