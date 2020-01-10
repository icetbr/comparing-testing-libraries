const assert = require('assert');
const Code = require('@hapi/code');
const { expect } = require('@hapi/code');
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
    const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
    // const expected = [data];
    assert.deepEqual(actual, expected);
    await employee.removeAll();
  });

  // it('insert saves the data to the database', async () => {
  //   const employee = { name: 1, jobTitle: 1, _id: 1, dti: 1 };
  //   // const savedEmployees = [{a: 1, _id: 1}]
  //   const savedEmployees = [{name: 1, job: 1, _id: 1, dti: 1}]
  //   chai.expect(savedEmployees[0]).to.include.all.keys('_id', 'dti');
  //     // could use Joi
  //   const transformedData = { job: employee.jobTitle };
  //   chai.expect([savedEmployees[0]]).to.have.members([transformedData]);
  //   chai.expect([savedEmployees[0]]).to.not.have.keys('jobTitle');


  //   // employee._id = savedEmployees[0]._id;
  //   // employee.dti = savedEmployees[0].dti;
  //   // expect(_.pick(savedEmployees[0], '_id', 'dti')).to.equal(_.pick(employee, '_id', 'dti'));

  //   // const { _id, dti }

  //   // const { _id, dti } = savedEmployees[0];
  //   // const metadata = { _id, dti };
  //   const metadata = [ '_id', 'dti' ];
  //   // expect(Object.keys(_.pick(savedEmployees[0], metadata))).to.equal(metadata);
  //   // const metadata =
  //   // expect(Object.keys(savedEmployees[0]).filter());
  //   // expect([savedEmployees[0].dti, savedEmployees[0]._id]).filter())
  // });

  // it.only('insert2 saves the data to the database', async () => {
  //   const data = { name: 'John', email: 'john@test.com', description: 'average height' };
  //   await employee.insert(data);

  //   const actual = await employee.find();

  //   const expected = [{ ...data, name: 'John2' }];
  //   // assert.deepEqual(actual, expected);
  //   chai.expect(actual).to.deep.equal(expected);
  //   // actual.should.equal(expected);
  //   // expectJest(actual).toEqual(expected);
  //   // expect(actual).to.equal(expected);
  //   // unexpect(actual, 'to equal', expected);
  //   await employee.removeAll();
  // });

});