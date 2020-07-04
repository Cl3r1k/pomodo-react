// Husky can prevent bad git commit, git push and more
// https://github.com/typicode/husky
// Supported git-hooks: https://git-scm.com/docs/githooks
// Additional info about hooks order https://www.codeflow.site/ru/article/how-to-use-git-hooks-to-automate-development-and-deployment-tasks

module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'prepare-commit-msg': 'node ./generate.build.js', // Increment build after linters, but before 'commitlint'
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};

// NOTE: If 'commitlint' fails, 'generate.build.js' will be performed any way
