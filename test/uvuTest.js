import employee from '../src/employee.js';
import { suite } from 'uvu';
import { equal as eq } from 'uvu/assert';
const test = suite('employee');

test('insert saves the data to the database', async () => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
    eq(actual, expected);
    await employee.removeAll();
});

await test.run();
