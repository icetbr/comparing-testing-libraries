import { deepStrictEqual } from 'assert/strict';

const tests = [];
const onlies = [];

const print = m => process.stdout.write(m);

const complete = startedAt => () =>
    print(`${onlies.length || tests.length} tests (${Date.now() - startedAt} ms) \n\n`);

const fail = e => print(e.stack);

const run = async ({ fn }) =>
        Promise.resolve(fn())
        .catch(fail);

const runAll = tests => () =>
    Promise.all(tests.map(run))
    .then(complete(Date.now()));

setImmediate(runAll(onlies.length ? onlies : tests));

export const
    test = (name, fn) => tests.push({ name, fn }),
    only = (name, fn) => onlies.push({ name, fn }),
    eq = deepStrictEqual;