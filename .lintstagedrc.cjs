// Run linters against staged git files
// https://github.com/okonet/lint-staged

module.exports = {
  '*.+(js|jsx|ts|tsx)': ['eslint', 'prettier --write'],
  '*.+(json|md|graphql)': ['prettier --write'],
  '*.+(css|less|styl|scss|sass|sss)': ['stylelint --fix']
};
