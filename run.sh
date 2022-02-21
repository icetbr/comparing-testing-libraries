#!/bin/bash

source $(dirname $0)/scripts/utils.sh
source $(dirname $0)/scripts/base.sh
source $(dirname $0)/scripts/perf.sh
source $(dirname $0)/scripts/diffErrors.sh

10Times() { time for i in {1..10}; do eval ${!1}; done;}
100Times() { time for i in {1..100}; do eval ${!1}; done;}

# replaces test/* with simple tests
genBaseTests() { template=baseTemplate node generators/generate.mjs; }

# replaces test/* with tests causing an error on an object of medium size
genMediumTests() { template=mediumDiffErrorTemplate node generators/generate.mjs; }

# replaces test/* with tests causing an error on an object of large size
genLargeTests() { template=largeDiffErrorTemplate node generators/generate.mjs; }

# generates an performance report in out/perfResults.txt
perfReport() {
  libs=(jest ava tap mocha lab pta tape tapeReport zoraReport uvu xv zora baretest tehanu best notest)
  fastestLibs=(zoraReport uvu zora xv baretest tehanu best notest)

  perfReport "${libs[@]}" "${fastestLibs[@]}"
}

smallDiffErrorsReport() { genBaseTests; _doReport $1 $2 "smallDiffErrors" "mode=equalError"; }
mediumDiffErrorsReport() { genMediumTests; _doReport $1 $2 "mediumDiffErrors" ""; }
largeDiffErrorsReport() { genLargeTests; _doReport $1 $2 "largeDiffErrors" ""; }

# generates assertion error reports in out/*.ansi
diffErrorsReport() {
  libs=(jest ava tap mocha lab pta tape uvu zora baretest tehanu best)
  tapLibs=(tapDiff2 tapArc tapDifflet tapSpec tapNirvana)

  smallDiffErrorsReport "${libs[@]}" "${tapLibs[@]}"
  mediumDiffErrorsReport "${libs[@]}" "${tapLibs[@]}"
  largeDiffErrorsReport "${libs[@]}" "${tapLibs[@]}"
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