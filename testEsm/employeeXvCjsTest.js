const { deepStrictEqual: eq } = require('assert/strict');
const employee = require('../src/employee');

exports.testInsertSavesTheDataToTheDatabase = async () => {
  const data = { name: 'John', email: 'john@test.com', description: 'average height' };
  await employee.insert(data);

  const actual = await employee.find();

  const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
  eq(actual, expected);
  await employee.removeAll();
};

// export function testAdd() {
//   assert.equal(1 + 3, 3)
// }