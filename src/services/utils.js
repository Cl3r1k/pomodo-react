export const delay = ms => new Promise(res => setTimeout(() => res(), ms));

export const delayCallback = (cb, ms) => setTimeout(cb, ms);

export const combineToQuery = (params, delimiter = '&') => {
  const keys = Object.keys(params);

  return keys.reduce((acc, key, idx) => {
    const param = `${acc}${key}=${params[key]}`;

    if (idx < keys.length - 1) return param + delimiter;

    return param;
  }, '');
};
