const employee = require('../src/employee');
const { expect } = require('@hapi/code');
const { lab } = exports.lab = require('@hapi/lab').script();

test('insert saves the data to the database', async () => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
    expect(actual).to.equal(expected);
    await employee.removeAll();
});