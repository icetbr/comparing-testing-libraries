const employee = require('../src/employee');

describe('employee', () => {

  test('insert saves the data to the database', async () => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = [data];
    expect(actual).toEqual(expected);
    await employee.removeAll();
  });

  // test('insert2 saves the data to the database', async () => {
  //   const data = { name: 'John', email: 'john@test.com', description: 'average height' };
  //   await employee.insert(data);

  //   const actual = await employee.find();

  //   const expected = [{ ...data, name: 'John1' }];
  //   expect(actual).toEqual(expected);
  //   await employee.removeAll();
  // });

});