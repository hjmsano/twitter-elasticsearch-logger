module.exports = {
  browser: false,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  projects: [
    {
      displayName: "test"
    },
    {
      displayName: "ESLint",
      runner: "jest-runner-eslint",
    }
  ]
};
