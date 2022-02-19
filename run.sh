#!/bin/bash

#######################
# REPORTERS
#######################

tapDiff2="./node_modules/.bin/tap-diff2"                 # the compare output is like lab
tapArc="./node_modules/.bin/tap-arc"
zr="./node_modules/.bin/zr"

tapDifflet="./node_modules/.bin/tap-difflet"             # verbose compare output
tapSpot="./node_modules/.bin/tap-spot"                   # missing stringify for objects

tapMocha="./node_modules/.bin/tap-mocha-reporter"
tapBail="./node_modules/.bin/tap-bail"                   # output like tap
tapSimple="./node_modules/tap-simple/bin/tap-simple"     # doesn't work
tapSpec="./node_modules/.bin/tap-spec"
tapSummary="./node_modules/.bin/tap-summary"
tapNirvana="./node_modules/.bin/tap-nirvana"
tapSlim="./node_modules/.bin/slim-reporter theme=light"
tapSpecDot="./node_modules/.bin/tap-spec-dot"
tapOne="./node_modules/.bin/tap-one"                     # very minimalistic


#######################
# RUNNERS
#######################
# combine with watcher of choice, see README for examples

ava="./node_modules/ava/entrypoints/cli.mjs --serial --fail-fast test/avaTest.js"
baretest="node test/baretestTest.js"
best="node test/bestTest.js"
jest="./node_modules/jest/bin/jest.js --runInBand test/jestTest.js"
lab="./node_modules/@hapi/lab/bin/lab test/labTest.js"
mocha="./node_modules/mocha/bin/mocha -r chai/register-expect --inline-diffs --bail --ui=tdd --leaks --reporter min test/mochaTest.js"
tap="./node_modules/tap/bin/run.js --no-coverage --reporter silent ./test/tapTest.js"
tape="./node_modules/tape/bin/tape test/tapeTest.js"
tehanu="node test/tehanuTest.js"
uvu="node test/uvuTest.js"
zora="node ./test/zoraTest.js"

# RUNNERS: VARIATIONS
tapeReport="$tape | $tapOne"
pta="./node_modules/pta/src/bin.js ./test/zoraTest.js"
zoraReport="node test/zoraTest.js | $tapOne"
notest="node test/special/notestTest.js"
xv="./node_modules/.bin/xv test/special/xvTest.mjs"
vitest="./node_modules/vitest/vitest.mjs"

# RUNNERS: EXPERIMENTS
mochaParallel="./node_modules/mocha-parallel-tests/dist/bin/cli.js -r chai/register-expect --inline-diffs --reporter min test/employeeMochaTest.js"
labVerbose="./node_modules/@hapi/lab/bin/lab --verbose --leaks test/employeeLabTest.js"
tapePromise="node ./test/employeeTapePromiseTest.js"
zora2="ZORA_REPORTER=json node ./test/experiments/employeeZora2Test.mjs"
zoraReportZr="ZORA_REPORTER=json node test/employeeZoraTest.js | $zr"
bestFull="node test/experiments/employeeBestFullTest.mjs"

xvCjs="./node_modules/.bin/xv testEsm/employeeXvCjsTest.js"
ptaEsm="./node_modules/pta/src/bin.js -R tap ./testEsm/employeeZoraEsmTest.mjs"
zoraEsm="node ./testEsm/employeeZoraEsmTest.mjs"
notestEsm="node testEsm/employeeNotestEsmTest.mjs"
bestEsm="node testEsm/employeeBestEsmTest.mjs"
tehanuEsm="node testEsm/employeeTehanuEsmTest.mjs"

#######################
# WATCHERS
#######################

nodemon() { ./node_modules/nodemon/bin/nodemon.js -x "printf \"\033c\";${!1}"; }
chokidar() { ./node_modules/chokidar-cli/index.js {test,src}/*.js --initial -c "printf \"\033c\";${!1}"; }
onchange() { ./node_modules/onchange/cli.js {test,src}/*.js -i src/**/*.js test/**/*.js -o "printf \"\033c\";${!1}"; }

## NATIVE WATCHERS
mochaWatch="$mocha --reporter min --watch --inline-diffs -r chai/register-expect"
jestWatch="$jest --watch --runInBand --bail 1"
avaWatch="$ava --watch"


#######################
# OTHERS
#######################

## TEST DIFFERENT ASSERT LIBS WITH MOCHA
mochaAssert="./node_modules/mocha/bin/mocha  --inline-diffs --reporter min test/employeeMochaAssertTest.js"

## REPORT TESTS
report="node test/reports/reportTest.js | $tapArc"

## PERF TEST
perf() { time for i in {1..10}; do eval ${!1}; done;}
perf100() { time for i in {1..100}; do eval ${!1}; done;}

## RUNNER: see README.md for examples
if [ $1 == "perf" ]; then
  perf $2
elif [ -z "$2" ]; then  # if doesn't have 2nd param
  eval ${!1} #for zora
else
  $1 $2
fi