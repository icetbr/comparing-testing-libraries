import { assert, expect, test , it, describe } from 'vitest';
import employee from '../src/employeeEsm.mjs';

describe('employee', () => {

  it('insert saves the data to the database', async () => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
    expect(actual).toEqual(expected);
    await employee.removeAll();
  });

});

