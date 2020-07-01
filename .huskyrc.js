// Husky can prevent bad git commit, git push and more
// https://github.com/typicode/husky
// Supported git-hooks: https://git-scm.com/docs/githooks

module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'commit-msg':
      'node ./generate.build.js && git add ./src/metadata.json && commitlint -E HUSKY_GIT_PARAMS',
  },
};

// Consider to use 'applypatch-msg' or 'pre-applypatch' or 'post-applypatch' hooks for 'new build generation'
