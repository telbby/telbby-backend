module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).(ts|js)'],
  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  coverageReporters: ['html', 'text'],
  coverageDirectory: 'coverage',
};
