#!/usr/bin/env bash
#!/usr/bin/env sh
#/bin/sh
#!/bin/sh

nodemon() { ./node_modules/nodemon/bin/nodemon.js -x "printf \"\033c\";${!1}"; }
# nodemon() { ./node_modules/nodemon/bin/nodemon.js -x "printf \"\033c\";$($1)"; }
# nodemon() { echo $($1); }
chokidar() { ./node_modules/chokidar-cli/index.js {test,src}/*.js --initial -c "printf \"\033c\";${!1}"; }
onchange() { ./node_modules/onchange/cli.js {test,src}/*.js -i src/**/*.js test/**/*.js -o "printf \"\033c\";${!1}"; }

tapDifflet="./node_modules/tap-difflet/bin/tap-difflet"
# modes=['equalError', 'exception']

# combine with watcher of choice
# mocha() { ./node_modules/mocha/bin/mocha test/success/employeeMochaTest.js; } preciso como string!!
mocha="./node_modules/mocha/bin/mocha -r chai/register-expect --inline-diffs --reporter min test/employeeMochaTest.js"
mochaParallel="./node_modules/mocha-parallel-tests/dist/bin/cli.js -r chai/register-expect --inline-diffs --reporter min test/employeeMochaTest.js"
jest="./node_modules/jest/bin/jest.js --runInBand"
ava="./node_modules/ava/cli.js --serial --fail-fast test/employeeAvaTest.js"
lab="./node_modules/@hapi/lab/bin/lab --silence test/employeeLabTest.js"
tape="./node_modules/tape/bin/tape test/employeeTapeTest.js"
tap="./node_modules/tap/bin/run.js --no-coverage --reporter silent ./test/employeeTapTest.js"
tapeReport="$tape | $tapDifflet"
zora="echo 'process.exit(0);' | node -r ./test/employeeZoraTest.js"
zoraReport="$zora | $tapDifflet"
zoraSingle="node ./test/employeeZoraTest.js"

# zora1() { echo 'process.exit(0);' | node -r ./test/employeeZoraTest.js; }

# native watch
mochaWatch="$mocha --reporter min --watch --inline-diffs -r chai/register-expect"
jestWatch="$jest --watch --runInBand --bail 1"
avaWatch="$ava --watch"

# assert watch
mochaAssert="./node_modules/mocha/bin/mocha  --inline-diffs --reporter min test/employeeMochaAssertTest.js"

perf() { time for i in {1..10}; do eval ${!1}; done;}

if [ $1 == "perf" ]; then
  ## ./run.sh perf jest
  perf $2
  # time for i in {1..10}; do ${!2}; done
# if doesn't have 2nd param
elif [ -z "$2" ]; then
  ## ./run.sh jestWatch
  # ${!1}
  # ${zora}
  # mode=exception eval node ${!1}
  eval node ${!1}
  # mode=equalError $1
else
  ## ./run.sh nodemon lab
  $1 $2
fi
