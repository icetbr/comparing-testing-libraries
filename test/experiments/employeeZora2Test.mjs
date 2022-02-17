import { hold, report, test } from 'zora';
import { createDiffReporter } from 'zora-reporters';
import employee from '../src/employeeEsm.mjs';

hold(); // prevent the default test harness to start its reporting

test('employee', async t => {

  await t.test('insert saves the data to the database', async t => {
      const data = { name: 'John', email: 'john@test.com', description: 'average height' };
      await employee.insert(data);

      const actual = await employee.find();

      const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
      t.equal(actual, expected);
      await employee.removeAll();
    });

});

// create your custom reporter
const reporter = createDiffReporter();

// start reporting
report({ reporter });