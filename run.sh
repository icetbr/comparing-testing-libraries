#!/bin/bash

source $(dirname $0)/scripts/utils.sh
source $(dirname $0)/scripts/aux.sh

PATH=$PATH:node_modules/.bin

ava="ava --serial --fail-fast test/avaTest.js"
best="node test/bestTest.js"
jest="node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand" # can't specify file here, experimental-vm-modules needed for ESM
lab="lab test/labTest.js"
mocha="mocha -r chai/register-expect.js --inline-diffs --bail --ui=tdd --leaks --reporter min test/mochaTest.js"
tap="tap --disable-coverage --reporter=silent ./test/tapTest.js"
tape="tape test/tapeTest.js"
tehanu="node test/tehanuTest.js"
uvu="node test/uvuTest.js"
zora="node ./test/zoraTest.js"
native="node --test-reporter dot ./test/nativeTest.js"
vitest="vitest" #can't specify file here
notest="node test/special/notestTest.js"
xv="xv test/special/xvTest.js"
bun="bun test ./test/bunTest.js"

perf="hyperfine -N --warmup 5 --export-markdown out/results.md '$notest' '$best' '$bun' '$tehanu' '$zora' '$xv' '$native' '$uvu' '$tape' '$mocha' '$lab' '$tap' '$ava' '$vitest' '$jest'"
genBaseTests=_genBaseTests


# usage: ./run.sh LIBNAME
echo $(purple "command") "${!1:-not found}"; eval ${!1}
