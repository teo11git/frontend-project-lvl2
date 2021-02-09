import _ from 'lodash';

const makeMerge = (obj1, obj2) => {
  const clone1 = _.cloneDeep(obj1);
  _.merge(clone1, obj2);
  return clone1;
};

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
  const countSharedKeys = _.intersection(Object.keys(obj1), Object.keys(obj2)).length;
  if (countSharedKeys === 0 && !_.isEmpty(obj1) && !_.isEmpty(obj2)) {
    return null;
  }
  const merged = makeMerge(obj1, obj2);
  const hasNoKey = 'special_no_key';
  return _.keys(merged).reduce((acc, key) => {
    const value1 = _.has(obj1, key) ? obj1[key] : hasNoKey;
    const value2 = _.has(obj2, key) ? obj2[key] : hasNoKey;
    const state = makeComparsion(value1, value2, hasNoKey);
    if (!_.isPlainObject(value1) && !_.isPlainObject(value2)) {
      switch (state) {
        case 'added':
          acc[key] = [value2, state];
          break;
        case 'changed':
          acc[key] = [value1, value2, state];
          break;
        default:
          acc[key] = [value1, state];
      }
      return acc;
    }
    switch (state) {
      case 'changed':
        acc[key] = calculateDelta(obj1[key], obj2[key], merged[key]);
        break;
      default:
        acc[key] = ['[complex_value]', state];
    }
    return acc;
  }, {});
};
export default calculateDelta;
