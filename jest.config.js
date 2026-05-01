module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/core/**/*.ts', 'src/use-cases/**/*.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
