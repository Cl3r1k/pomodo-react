// stylelint configuration
// https://stylelint.io/user-guide/configure
// https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configure.md#extends

module.exports = {
  // The standard config based on a handful of CSS style guides
  // https://github.com/stylelint/stylelint-config-standard
  extends: 'stylelint-config-standard',

  plugins: [
    // stylelint plugin to sort CSS rules content with specified order
    // https://github.com/hudochenkov/stylelint-order
    'stylelint-order',
  ],

  rules: {
    // Don't allow unknown properties
    // https://stylelint.io/user-guide/rules/property-no-unknown#property-no-unknown
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          // CSS Modules composition
          // https://github.com/css-modules/css-modules#composition
          'composes',
        ],
      },
    ],

    // Disallow unknown pseudo-class selectors
    // https://stylelint.io/user-guide/rules/selector-pseudo-class-no-unknown#selector-pseudo-class-no-unknown
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          // CSS Modules :global scope
          // https://github.com/css-modules/css-modules#exceptions
          'global',
          'local',
        ],
      },
    ],

    // Specify the order of content within declaration blocks
    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'at-rules',
      'rules',
    ],

    // Specify the order of properties within declaration blocks
    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-order/README.md
    'order/properties-order': ['position', 'width', 'height'],
  },
};
