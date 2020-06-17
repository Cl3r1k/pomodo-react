// Run linters against staged git files
// https://github.com/okonet/lint-staged

module.exports = {
  '*.+(js|jsx)': ['eslint', 'prettier --write'],
  '*.+(json|md|graphql)': ['prettier --write'],
  '*.+(css|less|styl|scss|sass|sss)': ['stylelint --fix'],
  // '*': (allFiles) => console.log('--------> allFiles: ', allFiles),
};
