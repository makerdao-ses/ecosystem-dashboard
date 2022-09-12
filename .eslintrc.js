/* eslint-disable @typescript-eslint/no-var-requires */
const { default: dictionary } = require('./src/core/utils/dictionary');
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'spellcheck'],
  rules: {
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'comma-dangle': ['error', 'only-multiline'],
    'object-property-newline': [
      'error',
      { allowAllPropertiesOnSameLine: false },
    ],
    'spellcheck/spell-checker': [
      1,
      {
        comments: true,
        strings: true,
        identifiers: true,
        templates: true,
        lang: 'en_US',
        skipWords: dictionary,
        skipIfMatch: [
          'http://[^s]*',
          '^[-\\w]+/[-\\w\\.]+$',
          '^(?=.*[a-zA-Z])(?=.*[0-9])',
        ],
        skipWordIfMatch: ['^foobar.*$'],
        minLength: 4,
      },
    ],
  },
};
