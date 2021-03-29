#!/bin/bash

## WATCHERS
nodemon() { ./node_modules/nodemon/bin/nodemon.js -x "printf \"\033c\";${!1}"; }
chokidar() { ./node_modules/chokidar-cli/index.js {test,src}/*.js --initial -c "printf \"\033c\";${!1}"; }
onchange() { ./node_modules/onchange/cli.js {test,src}/*.js -i src/**/*.js test/**/*.js -o "printf \"\033c\";${!1}"; }

tapDifflet="./node_modules/tap-difflet/bin/tap-difflet"

## TEST LIBS
# combine with watcher of choice, see README for examples
mocha="./node_modules/mocha/bin/mocha -r chai/register-expect --inline-diffs --bail --leaks --reporter min test/employeeMochaTest.js"
mochaParallel="./node_modules/mocha-parallel-tests/dist/bin/cli.js -r chai/register-expect --inline-diffs --reporter min test/employeeMochaTest.js"
jest="./node_modules/jest/bin/jest.js --runInBand employeeJestTest.js"
ava="./node_modules/ava/cli.js --serial --fail-fast test/employeeAvaTest.js"
lab="./node_modules/@hapi/lab/bin/lab --silence test/employeeLabTest.js"
tape="./node_modules/tape/bin/tape test/employeeTapeTest.js"
tapePromise="node ./test/employeeTapePromiseTest.js"
tap="./node_modules/tap/bin/run.js --no-coverage --reporter silent ./test/employeeTapTest.js"
tapeReport="$tape | $tapDifflet"
zora="echo 'process.exit(0);' | node -r ./test/employeeZoraTest.js"
pta="./node_modules/pta/src/cli.js -r tap ./test/employeePtaTest.js"
zoraReport="$zora | $tapDifflet"
zoraSingle="node ./test/employeeZoraTest.js"

## NATIVE WATCHERS
mochaWatch="$mocha --reporter min --watch --inline-diffs -r chai/register-expect"
jestWatch="$jest --watch --runInBand --bail 1"
avaWatch="$ava --watch"

## TEST DIFFERENT ASSERT LIBS WITH MOCHA
mochaAssert="./node_modules/mocha/bin/mocha  --inline-diffs --reporter min test/employeeMochaAssertTest.js"

## PERF TEST
perf() { time for i in {1..10}; do eval ${!1}; done;}

## RUNNER
if [ $1 == "perf" ]; then
  perf $2
elif [ -z "$2" ]; then  # if doesn't have 2nd param
  eval ${!1} #for zora
else
  $1 $2
fi
