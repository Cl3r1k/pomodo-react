export const delay = ms => new Promise(res => setTimeout(res(), ms));

export const delayCallback = (ms, cb) =>
  new Promise(res => setTimeout(res(cb), ms));
