// packages/utils/jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // ou 'node', dependendo do seu caso
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
