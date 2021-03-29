const test = require('ava');
const employee = require('../src/employee');

// no nesting allowed

test('insert saves the data to the database', async t => {
  const data = { name: 'John', email: 'john@test.com', description: 'average height' };
  await employee.insert(data);

  const actual = await employee.find();

  const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
  t.deepEqual(actual, expected);
  await employee.removeAll();
});