const employee = require('../src/employee');
const Code = require('@hapi/code');
const { test } = exports.lab = require('@hapi/lab').script();
const { expect } = require('@hapi/code');

test('insert saves the data to the database', async () => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
    expect(actual).to.equal(expected);
    await employee.removeAll();            
});

Code.settings.truncateMessages = true;