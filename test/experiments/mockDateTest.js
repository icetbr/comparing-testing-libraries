const { deepStrictEqual: eq } = require('assert/strict');
const Code = require('@hapi/code');
const expectLab = Code.expect;
const chai = require('chai');
const employee = require('../src/employee');
const expectJest = require('expect');
const should = require('should');
const unexpect = require('unexpected');
const _ = require('lodash');
const MockDate = require('mockdate');

Code.settings.truncateMessages = true;

describe('testes', () => {

  it('mockDate 1', async () => {
    // MockDate.set('2017-02-01');

    await timeout(1000);
    console.log(1, new Date());
  });

  it('mockDate 2', async () => {
    const constantDates = [new Date('2017-06-13'), new Date('2017-07-14'), new Date('2017-08-15')]

    /*eslint no-global-assign:off*/
    await timeout(1500);
    Date.i = 0;
    Date = class extends Date {
      constructor() {
        return constantDates[Date.i++];
      }
    }
    // MockDate.set('2017-02-01');
    console.log(2, new Date());
  });

  it('mockDate 3', async () => {
    // MockDate.set('2017-02-01');
    console.log(3, new Date());
  });

})

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}