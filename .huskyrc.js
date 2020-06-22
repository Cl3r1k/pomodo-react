// Husky can prevent bad git commit, git push and more
// https://github.com/typicode/husky

module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': 'lint-staged',
  },
};
