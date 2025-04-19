/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
    'stylelint-config-prettier-scss',
  ],
  rules: {
    'prettier/prettier': true,
    'no-duplicate-selectors': true,
    'color-hex-length': 'short',
    'color-named': 'never',
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'function-url-quotes': 'always',
    'font-weight-notation': 'numeric',
    'font-family-name-quotes': 'always-where-recommended',
    'at-rule-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'scss/dollar-variable-pattern': '^[a-z0-9]+(-[a-z0-9]+)*$',
    'scss/at-extend-no-missing-placeholder': true,
    'declaration-no-important': true,
    'length-zero-no-unit': true,
    'declaration-block-no-duplicate-properties': true,
    'no-irregular-whitespace': true,
    'selector-max-id': 0,
    'media-feature-range-notation': null,
    'selector-class-pattern': [
      /** Bem */
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
      {
        /** This option will resolve nested selectors with & interpolation. - https://stylelint.io/user-guide/rules/selector-class-pattern/#resolvenestedselectors-true--false-default-false */
        resolveNestedSelectors: true,
        /** Custom message
         * @param {string} selectorValue
         */
        message: function expected(selectorValue) {
          return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`
        },
      },
    ],
  },
}
