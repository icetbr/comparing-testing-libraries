// import dedent from '@michaelray/dedent';
import dedent from 'dedent-js';

export default [
    {
        name: 'ava',
        imports: `const test = require('ava');`,
        assertParam: `{ deepEqual: eq }`,
    },
    {
        name: 'baretest',
        imports: dedent`
            const test = require('baretest')('My app');
            const { deepStrictEqual: eq } = require('assert/strict');`,
        assertParam: ``,
        runner: dedent`
            !(async function () {
                await test.run();
            })();`
    },
    {
        name: 'best',
        imports: `const { test, eq } = require('../best/best.js');`,
    },
    {
        name: 'jest',
        assertion: 'expect(actual).toEqual(expected);',
    },
    {
        name: 'lab',
        imports: dedent`
            const Code = require('@hapi/code');
            const { test } = exports.lab = require('@hapi/lab').script();
            const { expect } = require('@hapi/code');`,
        assertion: `expect(actual).to.equal(expected);`,
        runner: `Code.settings.truncateMessages = true;` // reduce trash from output
    },
    {
        name: 'mocha',
        assertion: `expect(actual).to.deep.equal(expected);`,
    },
    {
        name: 'tape',
        imports: `const { test } = require('tape');`,
        assertParam: `{ same: eq, end }`,
        endTest: `\n    end();`,
    },
    {
        name: 'tap',
        imports: `const { test } = require('tap');`,
        assertParam: `{ same: eq, end }`,
        endTest: `\n    end();`,
    },
    {
        name: 'tehanu',
        imports: dedent`
            const test = require('tehanu')('');
            const { deepStrictEqual: eq } = require('assert/strict');`,
        assertParam: ``,
    },
    {
        name: 'uvu',
        imports: dedent`
            const { suite } = require('uvu');
            const { equal: eq } = require('uvu/assert');
            const test = suite('employee');`,
        runner: dedent`
            !(async function () {
                await test.run();
            })();`
    },
    {
        name: 'zora',
        imports: `const { test } = require('zora');`,
        assertParam: `{ equal: eq }`,
    },
];