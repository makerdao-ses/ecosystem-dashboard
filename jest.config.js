const nextJest = require('next/jest');
const createJestConfig = nextJest({
  dir: './',
});
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // map the ts aliases
    '^@ses/containers/(.*)$': '<rootDir>/src/stories/containers/$1',
    '^@ses/components/(.*)$': '<rootDir>/src/stories/components/$1',
    '^@ses/core/(.*)$': '<rootDir>/src/core/$1',
    '^@ses/config/(.*)$': '<rootDir>/src/config/$1',
    '^@ses/styles/(.*)$': '<rootDir>/styles/$1',
  },
};
module.exports = createJestConfig(customJestConfig);
