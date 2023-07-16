import employee from '../src/employee.js';
import Code from '@hapi/code';
import Lab from '@hapi/lab';
import { expect } from '@hapi/code';
export const lab = Lab.script();
const { test } = lab;

test('insert saves the data to the database', async () => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
    expect(actual).to.equal(expected);
    await employee.removeAll();
});

Code.settings.truncateMessages = true;
