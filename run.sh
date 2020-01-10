  #/bin/sh

nodemon() { ./node_modules/nodemon/bin/nodemon.js -x "printf \"\033c\";${!1}"; }
# nodemon() { ./node_modules/nodemon/bin/nodemon.js -x "printf \"\033c\";$($1)"; }
# nodemon() { echo $($1); }
chokidar() { ./node_modules/chokidar-cli/index.js {test,src}/*.js --initial -c "printf \"\033c\";${!1}"; }
onchange() { ./node_modules/onchange/cli.js {test,src}/*.js -i src/**/*.js test/**/*.js -o "printf \"\033c\";${!1}"; }

tapDifflet="./node_modules/tap-difflet/bin/tap-difflet"

# combine with watcher of choice
# mocha() { ./node_modules/mocha/bin/mocha test/success/employeeMochaTest.js; } preciso como string!!
mocha="./node_modules/mocha/bin/mocha -r chai/register-expect --inline-diffs --reporter min test/employeeMochaTest.js"
# jest="JEST_SILENT_REPORTER_DOTS=true ./node_modules/jest/bin/jest.js --runInBand --bail --reporters=jest-silent-reporter test/employeeJest.test.js"
jest="JEST_SILENT_REPORTER_DOTS=true ./node_modules/jest/bin/jest.js --runInBand --bail test/employeeJestTest.js"
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

if [ $1 == "perf" ]; then
  ## ./run.sh perf jest
  time for i in {1..10}; do ${!2}; done
elif [ -z "$2" ]; then
  ## ./run.sh jestWatch
  # ${!1}
  # ${zora}
  mode=equalError eval ${!1}
  # mode=equalError $1
else
  ## ./run.sh nodemon lab
  mode=equalError $1 $2
fi
