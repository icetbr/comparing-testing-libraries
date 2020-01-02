  #/bin/sh

nodemon() { ./node_modules/nodemon/bin/nodemon.js -x "printf \"\033c\";${!1}"; }
chokidar() { ./node_modules/chokidar-cli/index.js {test,src}/*.js --initial -c "printf \"\033c\";${!1}"; }
onchange() { ./node_modules/onchange/cli.js {test,src}/*.js -i src/**/*.js test/**/*.js -o "printf \"\033c\";${!1}"; }

# combine with watcher of choice
mocha="./node_modules/mocha/bin/mocha test/employeeMochaTest.js"
jest="./node_modules/jest/bin/jest.js test/employeeJest.test.js"
ava="./node_modules/ava/cli.js --serial test/employeeAvaTest.js"
lab="./node_modules/@hapi/lab/bin/lab --silence test/employeeLabTest.js"
tape="./node_modules/tape/bin/tape test/employeeTapeTest.js"
tap="./node_modules/tap/bin/run.js --no-coverage --reporter silent ./test/employeeTapTest.js"
tapeReport="$tape | tap-difflet"
zora="echo 'process.exit(0);' | node -r ./test/employeeZoraTest.js"
zoraReport="$zora | tap-difflet"
zoraSingle="node ./test/employeeZoraTest.js"

# native watch
mochaWatch="$mocha --reporter min --watch --inline-diffs -r chai/register-expect"
jestWatch="$jest --watch --runInBand --bail 1"
avaWatch="$ava --watch"

if [ $1 == "perf" ]; then
  ## ./run.sh perf jest
  time for i in {1..10}; do ${!2}; done
elif [ -z "$2" ]; then
  ## ./run.sh jestWatch
  ${!1}
else
  ## ./run.sh nodemon lab
  $1 $2
fi
