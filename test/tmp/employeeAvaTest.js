const test = require('ava');
const employee = require('../src/employee');

test('insert saves the data to the database', async t => {
  const data = { name: 'John', email: 'john@test.com', description: 'average height' };
  await employee.insert(data);

  const actual = await employee.find();

  const expected = [data];
  t.deepEqual(actual, expected);
  await employee.removeAll();
});

// test('insert2 saves the data to the database', async t => {
//   const data = { name: 'John', email: 'john@test.com', description: 'average height' };
//   await employee.insert(data);

//   const actual = await employee.find();

//   const expected = [{ ...data, name: 'John1' }];
//   t.deepEqual(actual, expected);
//   await employee.removeAll();
// });