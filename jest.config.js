export default {
  bail: 1,
  testEnvironment: "node",
  testRunner: "jest-circus/runner",
  testRegex: "test",
  // testRegex: "test.employeeJestTest.js",
  // testRegex: "test.matchObjectTest.js",
  // testMatch: ["**/test/matchObjectTest.js"],
  reporters: [
    ["jest-silent-reporter", { "useDots": true }]
  ],
};
