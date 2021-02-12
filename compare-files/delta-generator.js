import _ from 'lodash';

const makeComparsion = (val1, val2, specialValue) => {
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

const calculateDelta = (obj1, obj2) => {
  if (_.isEqual(obj1, obj2)) {
    return null;
  }
  const countCommonKeys = _.intersection(Object.keys(obj1), Object.keys(obj2)).length;
  if (countCommonKeys === 0 && !_.isEmpty(obj1) && !_.isEmpty(obj2)) {
    return null;
  }
  const hasNoKey = 'special_no_key';
  return _.union(Object.keys(obj1), Object.keys(obj2)).reduce((acc, key) => {
    const value1 = _.has(obj1, key) ? obj1[key] : hasNoKey;
    const value2 = _.has(obj2, key) ? obj2[key] : hasNoKey;
    const state = makeComparsion(value1, value2, hasNoKey);
    if (_.isPlainObject(value1) || _.isPlainObject(value2)) {
      if (state === 'changed') {
        acc[key] = calculateDelta(obj1[key], obj2[key]);
      } else { 
      acc[key] = ['[complex_value]', state];
      }
      return acc;
    }
    if (state === 'added') {
      acc[key] = [value2, state];
    } else if (state === 'changed') {
      acc[key] = [value1, value2, state];
    } else {
      acc[key] = [value1, state];
    }
    return acc;
  }, {});
};
export default calculateDelta;
