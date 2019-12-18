const { test } = require('zora');
const employee = require('../src/employee');

test('employee', async t => {

  await t.test('insert saves the data to the database', async t => {
      const data = { name: 'John', email: 'john@test.com', description: 'average height' };
      await employee.insert(data);

      const actual = await employee.find();

      const expected = [data];
      t.equal(actual, expected);
      await employee.removeAll();
    });

  await t.test('insert2 saves the data to the database', async t => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = [{ ...data, name: 'John1' }];
    t.equal(actual, expected);
    await employee.removeAll();
  });

});