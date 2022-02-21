import { writeFileSync, readdirSync, rmSync, lstatSync } from 'fs';
import libs from './libs.mjs';
import templates from './templates.mjs';

// delete all files from ./test
readdirSync('test/').filter(f => lstatSync(`test/${f}`).isFile()).forEach(f => rmSync(`test/${f}`));

console.log('generating tests \n')

libs.forEach(lib => {
    writeFileSync(`test/${lib.name}Test.js`, templates[process.env.template](lib));
});