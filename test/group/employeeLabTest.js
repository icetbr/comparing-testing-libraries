const Code = require('@hapi/code');
const { expect } = require('@hapi/code');
const { describe, it } = exports.lab = require('@hapi/lab').script();
const employee = require('../src/employee');

Code.settings.truncateMessages = true;
describe('employee', () => {

  it('insert saves the data to the database', async () => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
    expect(actual).to.equal(expected);
    await employee.removeAll();
  });

});
