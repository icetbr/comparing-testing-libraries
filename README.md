Comparing the experience of using different testing libraries in javascript

## TODO
- migrate npm scripts to makefile
- compare speed when many tests
- compare assert libs

## Desired features
- fast
- easy toggle serial/parallel tests
  - unit run in parallel, e2e in serial
- pretty print string comparison diff
- async support
- no extra syntax
- clean stack traces
- bail on error


## My impressions

- less maintained libraries usually have deprecated dependencies, it would be ideal to avoid them
  - this include the many tap reporters

**Zora**
- paralell tests by default, it takes extra work to make then synchronous, bad for integration tests
- weird integrations with nodemon that makes it sometimes hang

**Jest**
- shows too many lines of useless output when in watch mode
- bail doesn't for tests in same file

**Tap reporters**
- the best one, tap-difflet needed to be merged with tap-dot for less verbose outputs

**Tape**
- no support for async (use tape-promise or other)

- **Ava**
- no support for nested tests
- parallel by default, but can use --serial cli
- annoying messages in watch mode


## Summary of tests

zora     |  0,52
zoraTap  |  0,86
tape     |  0,86
tap      |  5,07
tapeTap  |  0,99
ava      |  9,02
lab      |  3,61
jest     | 15,15
mocha    |  1,76

```sh

## zora
time for i in {1..10}; do echo 'process.exit(0);' | node -r ./test/employeeZoraTest.js; done # zora 0,524
time for i in {1..10}; do npm run testZora; done # zoraNpm 2,680
node_modules/nodemon/bin/nodemon.js -r ./test/employeeZoraTest.js # nodemon nearly instant

time for i in {1..10}; do echo 'process.exit(0);' | node -r ./test/employeeZoraTest.js | tap-summary; done # zoraTap 0,861
time for i in {1..10}; do node ./test/employeeZoraTest.js; done # zoraSingle 0,554

## tape
time for i in {1..10}; do ./node_modules/tape/bin/tape ./test/employeeTapeTest.js; done # tape 0,869
time for i in {1..10}; do ./node_modules/tape/bin/tape ./test/employeeTapeTest.js | tap-summary; done # tapeTap 0,997
time for i in {1..10}; do npm run testZora; done # tapeNpm 2,658

node_modules/nodemon/bin/nodemon.js tape ./test/employeeTapeTest.js # nodemon slighty slower then zora

## lab
time for i in {1..10}; do ./node_modules/@hapi/lab/bin/lab test/employeeLabTest.js; done # lab 3,616
node_modules/nodemon/bin/nodemon.js lab ./test/employeeLabTest.js # nodemon slighty slower then tape

## ava
time for i in {1..10}; do ./node_modules/ava/cli.js --serial test/employeeAvaTest.js; done # ava 9,062
## no nodemon, but native --watch very fast (slower then hapi)

## jest
time for i in {1..10}; do ./node_modules/jest/bin/jest.js test/employeeJest.test.js; done # jest 15,153
## no nodemon, but native --watch is as fast as hapi

## mocha
time for i in {1..10}; do ./node_modules/mocha/bin/mocha test/employeeMochaTest.js; done # mocha 1,762

## tap
time for i in {1..10}; do ./node_modules/tap/bin/run.js --no-coverage --reporter silent ./test/employeeTapTest.js; done # tape 5,076

 ```

