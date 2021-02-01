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
