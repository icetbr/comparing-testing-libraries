import employee from '../../src/employee.js';
import { deepStrictEqual as eq } from 'node:assert';

const data = { name: 'John', email: 'john@test.com', description: 'average height' };
await employee.insert(data);

const actual = await employee.find();

const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
// if (!eq(actual, expected)) throw new Error();
eq(actual, expected);
await employee.removeAll();
