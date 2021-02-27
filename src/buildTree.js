import _ from 'lodash';

const specialValue = 'special_no_value';

const makeComparsion = (val1, val2) => {
  if (val1 === specialValue) {
    return 'added';
  }
  if (val2 === specialValue) {
    return 'removed';
  }
  if (_.isEqual(val1, val2)) {
    return 'unchanged';
  }
  return 'changed';
};

const makeObject = (state, oldValue, newValue, children) => ({
  state, oldValue, newValue, children,
});

const isModifiedObjects = (value1, value2) => (
  (_.isPlainObject(value1) && _.isPlainObject(value2))
    && (
      _.intersection(
        Object.keys(value1),
        Object.keys(value2),
      ).length > 0
    )
);

const buildTree = (obj1, obj2) => _(_.union(Object.keys(obj1), Object.keys(obj2)))
  .sortBy()
  .reduce((acc, key) => {
    const value1 = _.has(obj1, key) ? obj1[key] : specialValue;
    const value2 = _.has(obj2, key) ? obj2[key] : specialValue;
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
        makeComparsion(value1, value2, specialValue),
        value1,
        value2,
        null,
      ),
    };
  }, {});
export default buildTree;
