Comparing the experience of using different testing libraries in javascript

My impressions
**Zora**
- paralell tests by default, it takes extra work to make then synchronous, bad for integration tests
- weird integrations with nodemon that makes it sometimes hang

**Jest**
- shows too many lines of useless output when in watch mode

**Tap reporters**
- the best one, tap-difflet needed to be merged with tap-dot for less verbose outputs

```sh

## zora

time for i in {1..10}; do echo 'process.exit(0);' | node -r ./test/employeeZoraTest.js; done # zora 0,555
time for i in {1..10}; do npm run testZora; done # zoraNpm 2,680
node_modules/nodemon/bin/nodemon.js -r ./test/employeeZoraTest.js # nodemon nearly instant

time for i in {1..10}; do echo 'process.exit(0);' | node -r ./test/employeeZoraTest.js | tap-summary; done # zoraTap 0,861
time for i in {1..10}; do node ./test/employeeZoraTest.js; done # zoraSingle 0,554

## tape

time for i in {1..10}; do ./node_modules/tape/bin/tape ./test/employeeTapeTest.js; done # tape 0,869
time for i in {1..10}; do ./node_modules/tape/bin/tape ./test/employeeTapeTest.js | tap-summary; done # tapeSummary 0,997
time for i in {1..10}; do npm run testZora; done # tapeNpm 2,658

node_modules/nodemon/bin/nodemon.js tape ./test/employeeTapeTest.js # nodemon slighty slower then zora

## ava

time for i in {1..10}; do ./node_modules/ava/cli.js test/employeeAvaTest.js; done # ava 9,062
## does not work with nodemon

## hapi

time for i in {1..10}; do ./node_modules/@hapi/lab/bin/lab test/employeeHapiTest.js; done # hapi 4,069
node_modules/nodemon/bin/nodemon.js lab ./test/employeeHapiTest.js # nodemon slighty slower then tape

## jest
time for i in {1..10}; do ./node_modules/jest/bin/jest.js test/employeeJest.test.js; done # jest 15,153
## no nodemon, but native --watch is as fast as hapi

## mocha

time for i in {1..10}; do ./node_modules/mocha/bin/mocha test/employeeMochaTest.js; done # mocha 1,762

 ```

