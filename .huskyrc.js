// Husky can prevent bad git commit, git push and more
// https://github.com/typicode/husky
// Supported git-hooks: https://git-scm.com/docs/githooks
// Additional info https://www.codeflow.site/ru/article/how-to-use-git-hooks-to-automate-development-and-deployment-tasks

module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'applypatch-msg': 'node ./generate.build.js && git add ./src/metadata.json',
  },
};

// Consider to use 'applypatch-msg' or 'pre-applypatch' or 'post-applypatch' hooks for 'new build generation'
// and try with 'prepare-commit-msg' hook
