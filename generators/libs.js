import dedent from 'codedent';

export default [
    {
        name: 'ava',
        imports: `import test from 'ava';`,
        assertParam: `{ deepEqual: eq }`,
    },
    {
        name: 'baretest',
        imports: dedent`
            import baretest from 'baretest';
            import { deepStrictEqual as eq } from 'node:assert';
            const test = baretest('My app');
        `,
        assertParam: '',
        runner: 'await test.run();'
    },
    {
        name: 'best',
        imports: `import { test, eq } from '../best/best.js';`,
    },
    {
        name: 'jest',
        assertion: 'expect(actual).toEqual(expected);',
    },
    {
        name: 'lab',
        imports: dedent`
            import Code from '@hapi/code';
            import Lab from '@hapi/lab';
            import { expect } from '@hapi/code';
            export const lab = Lab.script();
            const { test } = lab;
        `,
        assertion: `expect(actual).to.equal(expected);`,
        runner: `Code.settings.truncateMessages = true;` // reduce trash from output
    },
    {
        name: 'mocha',
        assertion: `expect(actual).to.deep.equal(expected);`,
    },
    {
        name: 'tape',
        imports: `import { test } from 'tape';`,
        assertParam: `{ same: eq, end }`,
        endTest: `\n    end();`,
    },
    {
        name: 'tap',
        imports: `import { test } from 'tap';`,
        assertParam: `{ same: eq, end }`,
        endTest: `\n    end();`,
    },
    {
        name: 'tehanu',
        imports: dedent`
            import tehanu from 'tehanu';
            const test = tehanu('');
            import { deepStrictEqual as eq } from 'node:assert';
        `,
        assertParam: ``,
    },
    {
        name: 'uvu',
        imports: dedent`
            import { suite } from 'uvu';
            import { equal as eq } from 'uvu/assert';
            const test = suite('employee');
        `,
        runner: 'await test.run();'
    },
    {
        name: 'zora',
        imports: `import { test } from 'zora';`,
        assertParam: `{ equal: eq }`,
    },
    {
        name: 'native',
        imports: dedent`
            import { test } from 'node:test';
            import { deepStrictEqual as eq } from 'node:assert';
        `,
        assertParam: ``,
    },
    {
        name: 'vitest',
        imports: `import { expect, it, describe, test } from 'vitest';`,
        assertion: 'expect(actual).toEqual(expected);',
    },
    {
        name: 'bun',
        imports: `import { expect, it, describe, test } from 'bun:test';`,
        assertion: 'expect(actual).toEqual(expected);',
    },
];
