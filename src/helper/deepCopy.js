/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function deepCopy(obj) {
  if (Array.isArray(obj)) {
    return obj.map(val => {
      if (typeof val === 'object' && val !== null) {
        return deepCopy(val);
      } else {
        return val;
      }
    });
  } else {
    const newObj = {};
    Object.getOwnPropertyNames(obj).forEach(key => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        newObj[key] = deepCopy(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  }
}
