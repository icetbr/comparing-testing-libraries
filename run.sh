#!/bin/bash

## WATCHERS
nodemon() { ./node_modules/nodemon/bin/nodemon.js -x "printf \"\033c\";${!1}"; }
chokidar() { ./node_modules/chokidar-cli/index.js {test,src}/*.js --initial -c "printf \"\033c\";${!1}"; }
onchange() { ./node_modules/onchange/cli.js {test,src}/*.js -i src/**/*.js test/**/*.js -o "printf \"\033c\";${!1}"; }

tapDiff2="./node_modules/.bin/tap-diff2"                   # compare output like lab
tapArc="./node_modules/.bin/tap-arc"

tapDifflet="./node_modules/.bin/tap-difflet"             # verbose compare output
tapSpot="./node_modules/.bin/tap-spot"                   # missing stringify for objects

tapMocha="./node_modules/.bin/tap-mocha-reporter"        # doesnt work
tapBail="./node_modules/.bin/tap-bail"                   # output like tap
tapSimple="./node_modules/tap-simple/bin/tap-simple"     # doesnt work
tapSpec="./node_modules/.bin/tap-spec"                   # doesnt work
tapSummary="./node_modules/.bin/tap-summary"             # no output
tapNirvana="./node_modules/.bin/tap-nirvana"             # doesnt work
tapSlim="./node_modules/.bin/slim-reporter theme=light"  # doesnt work
tapSpecDot="./node_modules/.bin/tap-spec-dot"            # doesnt work
tapOne="./node_modules/.bin/tap-one"                     # no output



## TEST LIBS
# combine with watcher of choice, see README for examples
mocha="./node_modules/mocha/bin/mocha -r chai/register-expect --inline-diffs --bail --leaks --reporter min test/employeeMochaTest.js"
mochaParallel="./node_modules/mocha-parallel-tests/dist/bin/cli.js -r chai/register-expect --inline-diffs --reporter min test/employeeMochaTest.js"
jest="./node_modules/jest/bin/jest.js --runInBand employeeJestTest.js"
vitest="./node_modules/vitest/vitest.mjs"
ava="./node_modules/ava/entrypoints/cli.mjs --serial --fail-fast test/employeeAvaTest.js"
lab="./node_modules/@hapi/lab/bin/lab --verbose --leaks test/employeeLabTest.js"
tape="./node_modules/tape/bin/tape test/employeeTapeTest.js"
tapePromise="node ./test/employeeTapePromiseTest.js"
tap="./node_modules/tap/bin/run.js --no-coverage --reporter silent ./test/employeeTapTest.js"
tapeReport="$tape | $tapDifflet"
zora="echo 'process.exit(0);' | node -r ./test/employeeZoraTest.js"
zoraEsm="node ./test/employeeZoraEsmTest.mjs"
pta="./node_modules/pta/src/bin.js -R tap ./test/employeePtaTest.js"
ptaEsm="./node_modules/pta/src/bin.js -R tap ./test/employeeZoraEsmTest.mjs"
zoraReport="$zora | $tapDifflet"
zoraSingle="ZORA_ONLY=true node ./test/employeeZoraTest.js"
uvu="node test/employeeUvuTest.js"
baretest="node test/employeeBaretestTest.js"
xv="DOESNT WORK ./node_modules/.bin/xv test/employeeXvTest.mjs"

## NATIVE WATCHERS
mochaWatch="$mocha --reporter min --watch --inline-diffs -r chai/register-expect"
jestWatch="$jest --watch --runInBand --bail 1"
avaWatch="$ava --watch"

## TEST DIFFERENT ASSERT LIBS WITH MOCHA
mochaAssert="./node_modules/mocha/bin/mocha  --inline-diffs --reporter min test/employeeMochaAssertTest.js"

## REPORT TESTS
report="node test/reports/reportTest.js | $tapDiff2"

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