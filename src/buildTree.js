import _ from 'lodash';

const specialValue = 'special_no_value';
/*
const defineType = (val1, val2) => {
  if (val1 === specialValue) {
    return 'added';
  }
  if (val2 === specialValue) {
    return 'removed';
  }
  if (_.isEqual(val1, val2)) {
    return 'unchanged';
  }
  if (_.isPlainObject(value1 && _.isPlainObjecy(value2))) {
    return 'modified';
  }
  return 'changed';
};

const makeObject = (state, oldValue, newValue, children) => ({
  state, key, oldValue, newValue, children,
});
*/
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

/*
    if (isModifiedObjects(obj1[key], obj2[key])) {
      return {
        ...acc,
        [key]: makeObject(
          'changed',
          '[Object]',
          '[Object]',
          buildTree(obj1[key], obj2[key]),
        ),
      };
    }
    return {
      ...acc,
      [key]: makeObject(
        makeComparsion(value1, value2),
        value1,
        value2,
        null,
      ),
    };
    */
export default buildTree;
