import { strict as assert } from 'assert'
// import employee from '../src/employee.js';

// export async function testInsertSavesTheDataToTheDatabase() {
//   const data = { name: 'John', email: 'john@test.com', description: 'average height' };
//   await employee.insert(data);

//   const actual = await employee.find();

//   const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
//   assert.deepEqual(actual, expected);
//   await employee.removeAll();
// };

export function testAdd() {
  assert.equal(1 + 2, 3)
}