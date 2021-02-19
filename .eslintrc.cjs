module.exports = {
  parser: '@typescript-eslint/parser',                                                    // Specifies the ESLint parser
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: '.',
    ecmaVersion: 2020,                                                                    // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',                                                                 // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,                                                                          // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect',                                                                  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',                                                           // Uses the recommended rules from @eslint-plugin-react
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',                                              // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended-requiring-type-checking',                      // Similar to recommended, the recommended-requiring-type-checking set is an opinionated set of rules. The difference being that all rules in this set will require type information to use. More information - https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md
    'prettier/@typescript-eslint',                                                        // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended'                                                         // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'prettier'],
  rules: {
    /**
     * @description rules of 'eslint' official
     */
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],                        // Disallow the use of console - Use console.error, console.warn and console.info instead
    'no-plusplus': 0,                                                                     // Disallow the unary operators ++ and -- 
    'linebreak-style': 0,                                                                 // Enforce consistent linebreak style - Incorrect  work in Windows (off)
    // 'no-param-reassign': 0,                                                            // Disallow Reassignment of Function Parameters (off)
    'import/imports-first': ['error', 'absolute-first'],                                  // This rule reports any imports that come after non-import statements
    'import/newline-after-import': 'error',                                               // Enforces having one or more empty lines after the last top-level import statement or require call
    'import/prefer-default-export': 0,                                                    // When there is only a single export from a module, prefer using default export over named export
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],            // Forbid the use of extraneous packages (Explicit set to true (default value) )
    'import/extensions': [                                                                // Ensure consistent use of file extension within the import path
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never',
      },
    ],

    /**
     * @description rules of 'eslint-plugin-react'
     */
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tx', '.tsx'] }],    // Allow file extensions that may contain JSX
    'react/prop-types': 'off',                                                              // Prevent missing props validation in a React component definition

    /**
     * @description rules of @typescript-eslint
     */
    '@typescript-eslint/explicit-function-return-type': 'error',                            // Explicit types for function return values makes it clear to any calling code what type is returned

    /**
     * @description rules of 'eslint-import-resolver-typescript'
     */
    'import/no-unresolved': 'error',                                                        // Turn on errors for missing imports

    /**
     * @description rules of 'eslint-plugin-prettier'
     */
    'prettier/prettier': ['error'],                                                         // Rule that formats content using Prettier
  },
  settings: {
    'import/resolver': {
      'typescript': {}                                                                      // TS aliases paths support for eslint, e.g. import Button from '@components/Button'
    },
  },
};

// * ESLint config Rules - https://eslint.org/docs/rules
// * eslint-plugin-import config Rules - https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
// * eslint-plugin-react config Rules - https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
// * typescript-eslint config Rules - https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
// * eslint-import-resolver-typescript (typescript aliases support) - https://github.com/alexgorbatchev/eslint-import-resolver-typescript
