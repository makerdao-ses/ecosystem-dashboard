/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @typescript-eslint/no-var-requires */
const dictionary = require('./src/core/utils/dictionary');
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
  plugins: ['react', '@typescript-eslint', 'spellcheck', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx', '.js', '.ts'] }],
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
        skipWords: dictionary,
        skipIfMatch: ['http://[^s]*', '^[-\\w]+/[-\\w\\.]+$', '^(?=.*[a-zA-Z])(?=.*[0-9])'],
        skipWordIfMatch: ['^foobar.*$'],
        minLength: 4,
      },
    ],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'storybook/story-exports': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '@/**/**',
            group: 'parent',
            position: 'before',
          },
        ],
        alphabetize: { order: 'asc' },
      },
    ],
  },
  ignorePatterns: ['!.storybook'],
};
