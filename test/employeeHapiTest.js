const { expect } = require('@hapi/code');
const { describe, it } = exports.lab = require('@hapi/lab').script();
const employee = require('../src/employee');

describe('employee', () => {

  it('insert saves the data to the database', async () => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = [data];
    expect(actual).to.equal(expected);
    await employee.removeAll();
  });

  it('insert2 saves the data to the database', async () => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = [{ ...data, name: 'John1' }];
    expect(actual).to.equal(expected);
    await employee.removeAll();
  });

});