import { deepStrictEqual } from 'assert/strict';

let tests = []

export function test(name, fn) {
    tests.push({ name, fn })
}

async function run() {
    try {
        for (let i = 0; i < tests.length; i++) {
            await tests[i].fn()
            // console.log('✅', tests[i].name)
        }
    } catch (e) {
        // console.log('❌', t.name)
        console.log(e.stack)
    }
}

setImmediate(run)

export const eq = deepStrictEqual
