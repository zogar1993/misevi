module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.svg$': 'jest-transform-stub'
  },
  setupFilesAfterEnv: ['<rootDir>/src/specs/setupTests.ts']
}
