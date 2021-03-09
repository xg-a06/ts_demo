const { toString } = Object.prototype;

function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]';
}

function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object';
}

function isPlainObject(val: any): val is Object {
  if (typeof val !== 'object' || val === null) {
    return false;
  }
  return Object.getPrototypeOf(val) === Object.prototype;
}

function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}

function deepMerge(...args: any[]): any {
  const ret = Object.create(null);
  args.forEach(obj => {
    if (obj) {
      Object.entries(obj).forEach(([k, v]) => {
        if (isPlainObject(v)) {
          if (isPlainObject(ret[k])) {
            ret[k] = deepMerge(ret[k], v);
          } else {
            ret[k] = deepMerge(v);
          }
        } else {
          ret[k] = v;
        }
      });
    }
  });

  return ret;
}

export { isDate, isObject, isPlainObject, extend, deepMerge };
