# replaces test/* with simple tests
_genBaseTests() { template=baseTemplate node generators/generate.js; }

# replaces test/* with tests causing an error on an object of medium size
_genMediumTests() { template=mediumDiffErrorTemplate node generators/generate.js; }

# replaces test/* with tests causing an error on an object of large size
_genLargeTests() { template=largeDiffErrorTemplate node generators/generate.js; }


smallDiffErrorsReport() { _genBaseTests; _doReport $1 $2 "smallDiffErrors" "mode=equalError"; }
mediumDiffErrorsReport() { _genMediumTests; _doReport $1 $2 "mediumDiffErrors" ""; }
largeDiffErrorsReport() { _genLargeTests; _doReport $1 $2 "largeDiffErrors" ""; }

# generates assertion error reports in out/*.ansi
diffErrorsReport() {
  libs=(jest ava mocha pta best)
  tapLibs=(tapDiff2 tapArc tapDifflet tapNirvana)

  smallDiffErrorsReport libs tapLibs
  mediumDiffErrorsReport libs tapLibs
  largeDiffErrorsReport libs tapLibs
}

npmCompare="node_modules/npm-compare/cli.js angular vue > x.ansi"
