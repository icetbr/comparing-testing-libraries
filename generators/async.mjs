import { writeFileSync, readdirSync, rmSync, lstatSync } from 'fs';
import dedent from '@michaelray/dedent';

const libs = [
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
            const { expect } = require('@hapi/code');
            const { lab } = exports.lab = require('@hapi/lab').script();`,
        assertion: `expect(actual).to.equal(expected);`,
    },
    {
        name: 'mocha',
        assertion: `expect(actual).to.deep.equal(expected);`,
    },
    {
        name: 'tape',
        imports: `const { test } = require('tape');`,
        assertParam: `{ same: eq, end }`,
        endTest: `\n        end();`,
    },
    {
        name: 'tap',
        imports: `const { test } = require('tap');`,
        assertParam: `{ same: eq, end }`,
        endTest: `\n        end();`,
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
        runner: `test.run();`,
    },
    {
        name: 'zora',
        imports: `const { test } = require('zora');`,
        assertParam: `{ equal: eq }`,
    },
];

const template = ({ imports = '', assertParam = '', assertion = 'eq(actual, expected);', runner = '', endTest = '' }) => dedent`
    const employee = require('../src/employee');
    ${imports}

    test('insert saves the data to the database', async (${assertParam}) => {
        const data = { name: 'John', email: 'john@test.com', description: 'average height' };
        await employee.insert(data);

        const actual = await employee.find();

        const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
        ${assertion}
        await employee.removeAll();${endTest}
    });

    ${runner}
`

readdirSync('test/').filter(f => lstatSync(`test/${f}`).isFile()).forEach(f => rmSync(`test/${f}`));

libs.forEach(lib => {
    writeFileSync(`test/${lib.name}Test.js`, template(lib));
});