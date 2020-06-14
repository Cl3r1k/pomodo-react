// stylelint configuration
// https://stylelint.io/user-guide/configure

module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [
    // stylelint plugin to sort CSS rules content with specified order
    // https://github.com/hudochenkov/stylelint-order
    'stylelint-order',
  ],

  rules: {
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
    'order/properties-order': ['width', 'height'],
  },
};
