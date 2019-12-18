const assert = require('assert');
const Code = require('@hapi/code');
const { expect } = require('@hapi/code');
const chai = require('chai');
const employee = require('../src/employee');
const expectJest = require('expect');
const should = require('should');
const unexpect = require('unexpected');

Code.settings.truncateMessages = true;

describe('employee', () => {

  it('insert saves the data to the database', async () => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = [data];
    assert.deepEqual(actual, expected);
    await employee.removeAll();
  });

  it.only('insert2 saves the data to the database', async () => {
    const data = { name: 'John', email: 'john@test.com', description: 'average height' };
    await employee.insert(data);

    const actual = await employee.find();

    const expected = [{ ...data, name: 'John1' }];
    // actual.should.equal(expected);
    // expectJest(actual).toEqual(expected);
    // assert.deepEqual(actual, expected);
    // expect(actual).to.equal(expected);
    // unexpect(actual, 'to equal', expected);
    chai.expect(actual).to.deep.equal(expected);
    await employee.removeAll();
  });

});