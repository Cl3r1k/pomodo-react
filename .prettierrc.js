// https://prettier.io/docs/en/options.html
// Prettier 2.2: new JavaScript parsers, TS 4.1 and ESM standalone bundles - https://prettier.io/blog/2020/11/20/2.2.0.html

module.exports = {
  endOfLine: 'lf',            // Common flavors of line endings - Carriage Return + Line Feed characters (\r\n), common on Windows (Default value changed from 'auto' to 'lf' in v2.0.0)
  semi: true,                 // Print semicolons at the ends of statements
  singleQuote: true,          // Use single quotes instead of double quotes
  tabWidth: 2,                // Specify the number of spaces per indentation-level
  bracketSpacing: true,       // Print spaces between brackets in object literals
  jsxBracketSameLine: false,  // Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements)
  arrowParens: 'avoid',       // Include parentheses around a sole arrow function parameter -> avoid default. (Default value changed from avoid to always in v2.0.0),
};
