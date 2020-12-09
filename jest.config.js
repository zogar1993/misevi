module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleDirectories: ['node_modules', 'src'],
  transform: {
      "^.+\\.svg$": "jest-svg-transformer"
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/specs/setupTests.ts"
  ]
};
