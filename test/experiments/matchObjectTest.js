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

chai.use(require('chai-subset'));
// chai.use(require("chai-better-shallow-deep-equal"));
chai.use(require("chai-deep-match"));
chai.use(require("chai-shallow-deep-equal"));

Code.settings.truncateMessages = true;

// const { test, describe, it } = exports.lab = require('@hapi/lab').script();

it('matchObject 1', async () => {
  const actual = {
    b: 1,
    c: 2,
    d: 3,
  };
  const expected = {
    b: 1,
    // c: 3,
    e: 4,
  };
  // expect(actual).containSubset(expected);
  expect(actual).shallowDeepEqual(expected);
  // expect(actual).deep.match(expected);
  // expectJest(actual).toMatchObject(expected);
  // expectJest(actual).toEqual(expected);
  // expectJest(actual).toEqual(expectJest.objectContaining(expected))
  // expectLab(actual).to.include(expected);
});

// test.skip('test 2', () => {
//     // objectContaining, with nested object, containing full props/values
//     // PASSES
//     expectJest({ position: { x: 0, y: 0 } }).toEqual(expectJest.objectContaining({
//       position: {
//         x: expectJest.any(Number),
//         y: expectJest.any(Number)
//       }
//     }));

//     // objectContaining, with nested object, containing partial props/values
//     // FAILS
//     expectJest({ position: { x: 0, y: 0 } }).toEqual(expectJest.objectContaining({
//       position: {
//         x: expectJest.any(Number)
//       }
//     }));

//     // // objectContaining, with nested object, also declared with objectContaining, containing partial props/values
//     // // PASSES
//     // expectJest({ position: { x: 0, y: 0 } }).toEqual(expectJest.objectContaining({
//     //   position: expectJest.objectContaining({
//     //     x: expectJest.any(Number)
//     //   })
//     // }));

//     // // toMatchObject, with nested object, containing full props/values
//     // // PASSES
//     // expectJest({ position: { x: 0, y: 0 } }).toMatchObject({
//     //   position: {
//     //     x: expectJest.any(Number),
//     //     y: expectJest.any(Number)
//     //   }
//     // });

//     // // toMatchObject, with nested object, containing partial props/values
//     // // PASSES
//     // expectJest({ position: { x: 0, y: 0 } }).toMatchObject({
//     //   position: {
//     //     x: expectJest.any(Number)
//     //   }
//     // });
//   });

