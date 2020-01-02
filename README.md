Comparing the developer experience of using different testing libraries in javascript

## How to run
1) clone
2) npm install
3) pick your target

Examples
```
./run.sh mochaWatch
./run.sh nodemon lab
./run.sh chockidar lab
./run.sh onchange zora
./run.sh perf jest
```

## What I'm looking for in a testing experience

- fast single test run
  - "flicker free" watch mode, that is I hit "CTRL + S" and VScode's terminal shows my test result without even blinking
- pretty print string comparison diff
  - I use almost exclusively deep equal comparison in all of my tests
- async support
- no special syntax
  - it should be easy to change between testing libraries
- clean stack traces
  - I only need one line of stacktrace to find my error, I dont want it to be the 5th of 10 lines
- clear terminal before run
- bail on error
  - if the change I made broke hundreds of test, I don't need to see all of them
- easy toggle serial/parallel tests
  - unit run in parallel, e2e in serial


## My impressions

- this is by no means a complete comparison, there is way to much to talk about each library
- all of these libraries are awesome and i could use any of them for my needs. Having the choice, I'm being very picky In order to choose one
- less maintained libraries usually have deprecated dependencies, it would be ideal to avoid them
  - this include many of the tap reporters
- popular libraries benefit from an active community, which translates to better assistance, more examples, plugins, etc
- the library performance is not as simple as it look like
  - for one off tests, some need to be run in watch mode because of the costly startup time (Jest)
  - for the whole test suite, some need to run in parallel mode to really shine
  - some are fast irregarding how you use them (zora, tape)
- I couldn't find any tap reorter that I like as it is
  - the best one, tap-difflet needed to be merged with tap-dot for less verbose outputs
- big projects like Ava and Jest have some interesting features, like running only the tests affected by the changed code
  - currently I don't need these

**Jest**
- very active development
- too many lines of useless output when in watch mode
- bail doesn't work for tests in the same file (bug)

**Mocha**
- very active development
- my flicker free dream come true!

- **Ava**
- very active development
- no support for nested tests
- parallel by default, but can use --serial cli
- annoying messages in watch mode
- the slowest of all watchers

**Lab**
- somewhat active development
- best (not by much) equal diff
- makes sense to use if you're using **hapi** (I am)

**Tape**
- no support for async (use tape-promise or other)
- need a tap reporter
- special syntax (`t.test`)

**Zora**
- interesting idea, it is "just" javascript
- fast no mather how you run it
- paralell tests by default, it takes extra work to make then synchronous, bad for integration tests
- weird integrations with nodemon that makes it sometimes hang
- the tap reporters I like are old and unmaintained
  - has its own reporter, but only if using its own runner
- special syntax (`t.test`, `await test`, and others)

## Benchmarks

- I started using npm scripts it has some overhead when first invoking them
- bash scripts give me more flexibility
- results from a XXX pc

## Watcher

- results based on observation using the fastest of the watchers
- 10 is instant feedback

| mocha    | 10 |
| zora     |  9 |
| tape     |  8 |
| jest     |  7 |
| lab      |  7 |
| ava      |  6 |

## From ground up

- the time to run 10 tests from the ground up
- **don't be fooled by the numbers**, these shouldn't be an issue for most people
  - 99% of the time people run tests in a batch, not like this
- checkout [zora's][https://github.com/lorenzofox3/zora] more interesting yet still somewhat irrelevant benchmark
- if you have an interesting benchmark, please send me the link

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

