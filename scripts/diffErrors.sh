_doReport() {
  local -n libs1=$1
  local -n tapLibs1=$2
  outputName="out/${3}.ansi"
  command=$4

  rm -f $outputName
  for lib in "${libs1[@]}"
  do
    header "${lib}" >> $outputName
    script -q /dev/null -c "$command eval ${!lib}" >> $outputName
  done

  for lib in "${tapLibs1[@]}"
  do
    header "${lib}" >> $outputName
    script -q /dev/null -c "$command $tape | ${!lib}" >> $outputName
  done
}