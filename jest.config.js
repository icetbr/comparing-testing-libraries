module.exports = {
  bail: 1,
  testEnvironment: "node",
  testRegex: "test.employeeJestTest.js",
  reporters: [
    ["jest-silent-reporter", { "useDots": true }]
  ],
};
