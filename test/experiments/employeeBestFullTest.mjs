// import { test, skip } from '../best/best1.mjs';
import { test, eq } from '../../best/bestFull.mjs';
import employee from '../../src/employeeEsm.mjs';

// skip = () => console.log('ddv')

// test('game2', () => eq(1, 2))

// try object.keys() and export objetc?

// test('1 insert saves the data to the database', () => { eq(1, 1) })
// test('2 insert saves the data to the database', () => { eq(1, 1) })

test('1 insert saves the data to the database', async () => {
  const data = { name: 'John', email: 'john@test.com', description: 'average height' };
  await employee.insert(data);

  const actual = await employee.find();

  const expected = true ? [{ ...data, name: 'John1' }] : [data];
  eq(actual, expected);
  await employee.removeAll();
});

// test('2 insert saves the data to the database', async () => {
//   const data = { name: 'John', email: 'john@test.com', description: 'average height' };
//   await employee.insert(data);

//   const actual = await employee.find();

//   const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
//   eq(actual, expected);
//   await employee.removeAll();
// });

// !(async function () {
//   await test.run()
// })()