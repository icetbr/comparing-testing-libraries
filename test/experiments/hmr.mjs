import { tap } from 'node:test/reporters';
import { run } from 'node:test';
import path from 'node:path';
import process from 'node:process';

run({ files: [path.resolve('./test/nodeTestEsm.mjs')] })
  .compose(tap)
  .pipe(process.stdout);

// const a = await import('./nodeTestEsm.mjs');

// async function main() {
//     const hotMod = await hotImport('nodeTestEsm.mjs');
// }

//   main()
//   .catch(console.error)

// console.log(module)

// const files =  import.meta.globEager('../nodeTest.js');
// const keys = Object.keys(files);
// for (let path of keys) {
//     console.log(path)
// }

  // require all files that match '*-spec.ts'
// var req = require.context('../', true, 'nodeTest.js');
// req.keys().forEach(req);

// this piece of code enables mocha HMR support
// require('vscode-mocha-hmr')(module);
