export const delay = ms => new Promise(res => setTimeout(() => res(), ms));

export const delayCallback = (cb, ms) => setTimeout(cb, ms);
