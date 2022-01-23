const { suite } = require('uvu');
const assert = require('uvu/assert');
const employee = require('../src/employee');

const it = suite('employee');

it('insert saves the data to the database', async () => {
  const data = { name: 'John', email: 'john@test.com', description: 'average height' };
  await employee.insert(data);

  const actual = await employee.find();

  const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
  assert.equal(actual, expected);
  await employee.removeAll();
});

it.run();