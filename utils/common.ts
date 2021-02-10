type ParseResult<T> =
  | { parsed: T; hasError: false; error?: undefined }
  | { parsed?: undefined; hasError: true; error?: unknown };

export const safeJsonParse = <T>(typeGuard: (o: unknown) => o is T) => (
  text: string
): ParseResult<T> => {
  try {
    const parsed: unknown = JSON.parse(text);
    return typeGuard(parsed) ? { parsed, hasError: false } : { hasError: true };
  } catch (error) {
    return { hasError: true, error: error };
  }
};

export const delay = (ms: number): Promise<void> =>
  new Promise(res => setTimeout(() => res(), ms));

export const delayCallback = (
  cb: (...args: unknown[]) => void,
  ms: number
): NodeJS.Timeout => setTimeout(cb, ms);

export const combineToQuery = <T extends Record<string, string | number>>(
  params: T,
  delimiter = '&'
): string => {
  const keys = Object.keys(params);

  return keys.reduce((acc, key, idx) => {
    const param = `${acc}${key}=${params[key]}`;

    if (idx < keys.length - 1) return param + delimiter;

    return param;
  }, '');
};

export const combineToParams = (query: string): Record<string, string> => {
  const q = query.replace(/^\??\//, '');

  return q.split('&').reduce((values, param) => {
    const [key, value] = param.split('=');

    return { ...values, [key]: value };
  }, {});
};