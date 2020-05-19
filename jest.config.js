module.exports = {
  bail: 1,
  testEnvironment: "node",
  testRegex: "test.employeeJestTest.js",
  // testRegex: "test.mockDateTest.js",
  reporters: [
    ["jest-silent-reporter", { "useDots": true }]
  ],
};
