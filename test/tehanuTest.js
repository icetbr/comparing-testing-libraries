import employee from '../src/employee.js';

import tehanu from 'tehanu';
const test = tehanu('');
import { deepStrictEqual as eq } from 'node:assert';
        

test('insert saves the data to the database', async () => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
    eq(actual, expected);
    await employee.removeAll();            
});

