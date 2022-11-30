/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @typescript-eslint/no-var-requires */
const dictionary = require('./src/core/utils/dictionary.js');
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'plugin:@typescript-eslint/recommended', 'plugin:storybook/recommended'],
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
    'max-lines': [
      'error',
      {
        max: 1000,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    semi: 0,
    indent: 0,
    'multiline-ternary': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
    'spellcheck/spell-checker': [
      1,
      {
        comments: true,
        strings: true,
        identifiers: true,
        templates: true,
        lang: 'en_US',
        skipWords: [...dictionary, 'Toastify'],
        skipIfMatch: ['http://[^s]*', '^[-\\w]+/[-\\w\\.]+$', '^(?=.*[a-zA-Z])(?=.*[0-9])'],
        skipWordIfMatch: ['^foobar.*$'],
        minLength: 4,
      },
    ],
  },
};
