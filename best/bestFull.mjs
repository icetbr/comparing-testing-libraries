import { deepStrictEqual } from 'assert/strict';

const tests = [];
const onlies = [];

const green = msg => `\x1b[32m${msg}\x1b[0m`;
const red = msg => `\x1b[31m${msg}\x1b[0m`;
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

// const fail = name => e => print('❌', name, '\n', e.stack);
const fail = name => e => {
    const messageLines = e.message.split('\n');
    const firstFrame = e.stack.split('\n')
                       .slice(messageLines.length, messageLines.length + 1)[0]
                       .replace(`file://${process.cwd()}/`, '');

    messageLines.splice(0, 2, red(name));
    messageLines.unshift('');

    messageLines.push('');
    messageLines.push(dim(firstFrame.trim()));
    messageLines.push('\n');

    print(messageLines.join('\n'))
};

const aeq = (a, b) => {
    if (!(a && b && typeof a == 'object' && typeof b == 'object')) return;

    var length, i, keys;
    if (Array.isArray(a)) {
        length = a.length;
        for (i = length; i-- !== 0;) aeq(a, b)
    }

    keys = Object.keys(a);
    length = keys.length;

    for (i = length; i-- !== 0;)
        if (typeof b[key] === 'function') {
            const matcher = b[key](a[key]);
            b[key] = matcher.expected;
            a[key] = matcher.actual;
            return;
        }

    for (i = length; i-- !== 0;) aeq(a[keys[i]], b[keys[i]])
    return eq(a, b)
}

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