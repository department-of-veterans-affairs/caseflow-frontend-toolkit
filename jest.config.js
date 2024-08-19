/* eslint-disable no-process-env */
module.exports = {
  moduleNameMapper: {
    '^app/(.*)$': '<rootDir>/app/$1',
    '^constants/(.*)$': '<rootDir>/constants/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
    '^COPY': '<rootDir>/COPY',
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
    '^common/(.*)$': '<rootDir>/app/components/common/$1'
  },
  // globalSetup: './test/global-setup.js',
  setupFilesAfterEnv: ['./test/app/jestSetup.js'],
  transformIgnorePatterns: ['node_modules/(?!@department-of-veterans-affairs/caseflow-frontend-toolkit)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  collectCoverage: Boolean(process.env.TEST_REPORTER),
  reporters: process.env.TEST_REPORTER ? [process.env.TEST_REPORTER] : ['default', 'jest-junit'],
  coverageDirectory: process.env.JEST_DIR || 'coverage',
  collectCoverageFrom: ['app/**/*.{js,jsx}', '!**/*.stories.*'],
  testMatch: ['<rootDir>/test/**/*-test.{js,jsx}', '**/?(*.)(spec|test).{js,jsx}'],
  testTimeout: 10000,
  // snapshotSerializers: ["<rootDir>/customSerializer.js"],
  testPathIgnorePatterns: ['/node_modules/', '/path-to-ignore/']
};
/* eslint-enable no-process-env */