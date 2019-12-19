const { test } = require('tape');
const employee = require('../src/employee');

test('employee', t => {

  t.test('insert saves the data to the database', async t => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = [data];
    t.same(actual, expected);
    await employee.removeAll();
    t.end();
  });

  // t.test('insert2 saves the data to the database', async t => {
  //   const data = { name: 'John', email: 'john@test.com', description: 'average height' };
  //   await employee.insert(data);

  //   const actual = await employee.find();

  //   const expected = [{ ...data, name: 'John1' }];
  //   t.same(actual, expected);
  //   await employee.removeAll();
  //   t.end();
  // });

});