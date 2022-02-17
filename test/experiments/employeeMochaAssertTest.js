const { deepStrictEqual: eq } = require('assert/strict');
const Code = require('@hapi/code');
const expectLab = Code.expect;
const chai = require('chai');
const employee = require('../src/employee');
const expectJest = require('expect');
const should = require('should');
const unexpect = require('unexpected');
const _ = require('lodash');

Code.settings.truncateMessages = true;

describe('employee', () => {

  it('insert saves the data to the database', async () => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = [{ ...data, name: 'John1' }];
    const expects = {
      assert: () => eq(actual, expected),
      chai: () => chai.expect(actual).to.deep.equal(expected),
      should: () => actual.should.equal(expected),
      jest: () => expectJest(actual).toEqual(expected),
      lab: () => expectLab(actual).to.equal(expected),
      unexpect: () => unexpect(actual, 'to equal', expected),
    };

    expects[process.env.mode]();
    await employee.removeAll();
  });


});