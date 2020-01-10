const employee = require('../src/employee');

// using global chai as it seems to be the most popular assertion lib for mocha

describe('employee', () => {

  it('insert saves the data to the database', async () => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
    expect(actual).to.deep.equal(expected);
    await employee.removeAll();
  });

});