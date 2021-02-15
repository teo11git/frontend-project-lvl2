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

const makeObject = (state, oldValue, newValue, children) => {
  return {state, oldValue, newValue, children};
};

const isModifiedObjects = (value1, value2) => {
  if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
    return _.intersection(Object.keys(value1), Object.keys(value2))
            .length > 0;
  }
  return false;  
};

const calculateDelta = (obj1, obj2) => {
  const specialValue = 'special_no_value';
  return _.union(Object.keys(obj1), Object.keys(obj2)).reduce((acc, key) => {
    const value1 = _.has(obj1, key) ? obj1[key] : specialValue;
    const value2 = _.has(obj2, key) ? obj2[key] : specialValue;
    acc[key] = makeObject(
     state: makeComparsion(val1, val2, specialValue),
     value1,
     value2,
     children: isModifiedObjects(value1, value2)
               ? calculateDelta(obj1[key], obj2[key])
               : {}
    );
    return acc
     }, {});
    }
};
export default calculateDelta;
