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
    return 'stay';
  }
  return 'changed';
};

const makeObject = (state, value, newValue, children) => ({
  state, value, newValue, children,
});

const isModifiedObjects = (value1, value2) => {
  if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
    return _.intersection(Object.keys(value1), Object.keys(value2))
      .length > 0;
  }
  return false;
};

const calculateDelta = (obj1, obj2) => _(_.union(Object.keys(obj1), Object.keys(obj2)))
  .sortBy()
  .reduce((acc, key) => {
    const value1 = _.has(obj1, key) ? obj1[key] : specialValue;
    const value2 = _.has(obj2, key) ? obj2[key] : specialValue;
    if (isModifiedObjects(obj1[key], obj2[key])) {
      acc[key] = makeObject(
        'changed',
        '[Object]',
        '[Object]',
        calculateDelta(obj1[key], obj2[key]),
      );
    } else {
      acc[key] = makeObject(
        makeComparsion(value1, value2, specialValue),
        value1,
        value2,
        null,
      );
    }
    return acc;
  }, {});
export default calculateDelta;
