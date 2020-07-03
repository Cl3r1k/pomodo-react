// Husky can prevent bad git commit, git push and more
// https://github.com/typicode/husky
// Supported git-hooks: https://git-scm.com/docs/githooks
// Additional info about hooks order https://www.codeflow.site/ru/article/how-to-use-git-hooks-to-automate-development-and-deployment-tasks

module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'prepare-commit-msg':
      'node ./generate.build.js && git add ./src/metadata.json',
  },
};
