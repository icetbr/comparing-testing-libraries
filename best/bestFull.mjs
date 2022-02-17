import { deepStrictEqual } from 'assert/strict';

const tests = [];
const onlies = [];

const green = msg => `\x1b[32m${msg}\x1b[0m`;
const purple = msg => `\x1b[35m${msg}\x1b[0m`;
const dim = msg => `\x1b[2m${msg}\x1b[0m`;

const print = m => process.stdout.write(m);

const complete = startedAt => () => {
    const skip = onlies.length && tests.length - onlies.length;
    const passed = green(`${onlies.length || tests.length} tests`);
    const skipped = skip ? purple(` ${skip} skipped`) : '';
    const duration = dim(` (${Date.now() - startedAt} ms) \n\n`);

    print(passed + skipped + duration);
};

const fail = name => e => print('❌', name, '\n', e.stack);

const run = async ({ name, fn }) =>
        Promise.resolve(fn())
        .catch(fail(name));

const runAll = tests => () =>
    Promise.all(tests.map(run))
    .then(complete(Date.now()));

setImmediate(runAll(onlies.length ? onlies : tests));

export const
    test = (name, fn) => tests.push({ name, fn }),
    only = (name, fn) => onlies.push({ name, fn }),
    eq = deepStrictEqual;