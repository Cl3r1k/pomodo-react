module.exports = {
  extends: [
    'react-app',
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/react',
  ],
  plugins: ['jsx-a11y', 'prettier'],
  rules: {
    // 
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'linebreak-style': 0,                                                         // Enforce consistent linebreak style - Incorrect  work in Windows (off)
    // 'no-param-reassign': 0,                                                    // Disallow Reassignment of Function Parameters (off)
    'import/imports-first': ['error', 'absolute-first'],                          // This rule reports any imports that come after non-import statements
    'import/newline-after-import': 'error',                                       // Enforces having one or more empty lines after the last top-level import statement or require call
    'import/prefer-default-export': 0,                                            // When there is only a single export from a module, prefer using default export over named export
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],    // Forbid the use of extraneous packages (Explicit set to true (default value) )
    'prettier/prettier': ['error'],                                               // Rule that formats content using Prettier
  },
  settings: {
    // Absolute imports support for eslint
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};

// ESLint config Rules - https://eslint.org/docs/rules
// eslint-plugin-import config Rules - https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
