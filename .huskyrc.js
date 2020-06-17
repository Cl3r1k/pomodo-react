// Husky can prevent bad git commit, git push and more
// https://github.com/typicode/husky

module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
  },
};
