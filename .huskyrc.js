// Husky can prevent bad git commit, git push and more
// https://github.com/typicode/husky
// Supported git-hooks: https://git-scm.com/docs/githooks

module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'commit-msg':
      'commitlint -E HUSKY_GIT_PARAMS && node ./generate.build.js && git add -A',
  },
};
