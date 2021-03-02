const isDesiredType = <TObj>(obj: unknown): obj is TObj => {
  // const keys = Object.keys(obj as Record<string, string>);
  // console.info('keys: ', keys);

  return (
    'build' in (obj as Record<string, string>) &&
    'version' in (obj as Record<string, string>)
  );
};

export const safeJsonParseObject = <T extends Record<string, string>>(
  text: string
): ParseResult<T> => {
  try {
    const parsed: unknown = JSON.parse(text);

    return isDesiredType<T>(parsed)
      ? { parsed, hasError: false }
      : { hasError: true };
  } catch (error) {
    return { hasError: true, error: error };
  }
};

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
