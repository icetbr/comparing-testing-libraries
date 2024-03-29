#!/bin/bash

source $(dirname $0)/scripts/utils.sh
source $(dirname $0)/scripts/base.sh
source $(dirname $0)/scripts/perf.sh
source $(dirname $0)/scripts/diffErrors.sh

10Times() { time for i in {1..10}; do eval ${!1}; done;}
100Times() { time for i in {1..100}; do eval ${!1}; done;}

# replaces test/* with simple tests
genBaseTests() { template=baseTemplate node generators/generate.js; }

# replaces test/* with tests causing an error on an object of medium size
genMediumTests() { template=mediumDiffErrorTemplate node generators/generate.js; }

# replaces test/* with tests causing an error on an object of large size
genLargeTests() { template=largeDiffErrorTemplate node generators/generate.js; }

# generates an performance report in out/perfResults.txt
perfReport() {
  # libs=(notest best tehanu baretest zora xv native uvu zoraReport tapeReport tape pta mocha lab tap ava jest vitest)
  libs=(vitest)
  # fastestLibs=(notest best tehanu baretest zora xv native uvu zoraReport)
  fastestLibs=(notest)

  runPerfReport "${libs[@]}" "${fastestLibs[@]}"
}

smallDiffErrorsReport() { genBaseTests; _doReport $1 $2 "smallDiffErrors" "mode=equalError"; }
mediumDiffErrorsReport() { genMediumTests; _doReport $1 $2 "mediumDiffErrors" ""; }
largeDiffErrorsReport() { genLargeTests; _doReport $1 $2 "largeDiffErrors" ""; }

# generates assertion error reports in out/*.ansi
diffErrorsReport() {
  libs=(jest ava mocha pta best)
  tapLibs=(tapDiff2 tapArc tapDifflet tapNirvana)

  smallDiffErrorsReport libs tapLibs
  mediumDiffErrorsReport libs tapLibs
  largeDiffErrorsReport libs tapLibs
}

## the main runner, see README.md for examples
runFunctionOrAlias() {
  if [[ $(type -t $1) == function ]]; then
    "$@"
  elif [ -v ${1} ]; then
    eval ${!1}
  else
    echo -e "target '${1}' not found\n"
  fi
}

runFunctionOrAlias $@
