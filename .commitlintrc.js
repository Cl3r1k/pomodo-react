// commitlint checks if your commit messages meet the conventional commit format (https://conventionalcommits.org)
// https://commitlint.js.org/#/guides-local-setup

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': () => {
      console.info('.......... IN header-max-length rule ..........');
      return [0, 'always', 72];
    },
  },
};

// Consider to use `generate.build.js` in .commitlintrc.js
// Look for `https://commitlint.js.org/#/reference-rules?id=rules`
// and `https://commitlint.js.org/#/reference-rules?id=header-min-length`
