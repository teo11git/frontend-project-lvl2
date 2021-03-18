import _ from 'lodash';

const buildTree = (data1, data2) => _(_.union(Object.keys(data1), Object.keys(data2)))
  .sortBy()
  .map((key) => {
    const oldValue = _.has(data1, key) ? data1[key] : undefined;
    const newValue = _.has(data2, key) ? data2[key] : undefined;
    if (oldValue === undefined) {
      return {
        type: 'added', key, oldValue, newValue,
      };
    }
    if (newValue === undefined) {
      return {
        type: 'removed', key, oldValue, newValue,
      };
    }
    if (_.isEqual(oldValue, newValue)) {
      return {
        type: 'unchanged', key, oldValue, newValue,
      };
    }
    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return {
        type: 'nasted',
        key,
        oldValue,
        newValue,
        children: [...buildTree(data1[key], data2[key])],
      };
    }
    return {
      type: 'changed', key, oldValue, newValue,
    };
  });
export default buildTree;
