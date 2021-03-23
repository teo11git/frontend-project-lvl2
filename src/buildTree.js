import _ from 'lodash';

const buildTree = (data1, data2) => _(_.union(Object.keys(data1), Object.keys(data2)))
  .sortBy()
  .map((key) => {
    if (!_.has(data1, key)) {
      return {
        type: 'added', key, newValue: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        type: 'removed', key, oldValue: data1[key],
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return {
        type: 'unchanged', key, oldValue: data1[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        type: 'nested',
        key,
        oldValue: data1[key],
        newValue: data2[key],
        children: [...buildTree(data1[key], data2[key])],
      };
    }
    return {
      type: 'changed', key, oldValue: data1[key], newValue: data2[key],
    };
  });
export default buildTree;
