import _ from 'lodash';

const specialValue = 'special_no_value';
const buildTree = (data1, data2) => _(_.union(Object.keys(data1), Object.keys(data2)))
  .sortBy()
  .map((key) => {
    const oldValue = _.has(data1, key) ? data1[key] : specialValue;
    const newValue = _.has(data2, key) ? data2[key] : specialValue;
    if (oldValue === specialValue) {
      return {
        state: 'added', key, oldValue, newValue,
      };
    }
    if (newValue === specialValue) {
      return {
        state: 'removed', key, oldValue, newValue,
      };
    }
    if (_.isEqual(oldValue, newValue)) {
      return {
        state: 'unchanged', key, oldValue, newValue,
      };
    }
    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return {
        state: 'modified',
        key,
        oldValue,
        newValue,
        children: [...buildTree(data1[key], data2[key])],
      };
    }
    return {
      state: 'changed', key, oldValue, newValue,
    };
  });
export default buildTree;
