import employee from '../../src/employee.js';
import { deepStrictEqual as eq } from 'node:assert';

export async function testInsertSavesTheDataToTheDatabase() {
  const data = { name: 'John', email: 'john@test.com', description: 'average height' };
  await employee.insert(data);

  const actual = await employee.find();

  const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
  eq(actual, expected);
  await employee.removeAll();
};

// export function testAdd() {
//   assert.equal(1 + 3, 3)
// }
