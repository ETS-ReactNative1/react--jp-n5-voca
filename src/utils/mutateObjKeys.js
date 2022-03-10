import _ from 'lodash';

export function transformFrontAndBack(arr, newObjKeys) {
  return arr.map((d) => {
    return _.mapKeys(d, (value, key) => {
      if (key === 'voca') return newObjKeys[0];
      else if (key === 'meaning') return newObjKeys[1];
      else return key;
    });
  });
}

export function transformUniqueId(arr) {
  return arr.map((d) => {
    return _.mapValues(d, (value, key) => {
      if (key === 'id') return value + _.uniqueId(Date.now());
      else return value;
    });
  });
}
