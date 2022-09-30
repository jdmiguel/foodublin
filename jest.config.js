module.exports = {
  collectCoverageFrom: [
    'api/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'helpers/**/*.{js,jsx,ts,tsx}',
    'layouts/**/*.{js,jsx,ts,tsx}',
    'server/**/*.{js,jsx,ts,tsx}',
    'services/**/*.{js,jsx,ts,tsx}',
    '!pages/**/*.{js,jsx,ts,tsx}',
    '!**/__stories__/**',
    '!**/__tests__/**',
    '!**/__mocks__/**',
    '!helpers/polyfills.ts',
    '!helpers/GlobalStylesHelper.ts',
  ],
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/components$1',
    '^@/store(.*)$': '<rootDir>/store$1',
    '^@/helpers(.*)$': '<rootDir>/helpers$1',
    '^@/services(.*)$': '<rootDir>/services$1',
  },
  testMatch: ['**/__tests__/**/*.spec.ts?(x)'],
  testURL: 'http://localhost',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coverageDirectory: 'jest-coverage',
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
      },
    },
  },
};
