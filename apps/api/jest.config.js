/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  collectCoverage: true,
  coverageReporters: ["lcov", "text-summary"],
  collectCoverageFrom: ["tests/**/*.ts"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  testPathIgnorePatterns: ["/node_modules/"],
};