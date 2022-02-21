_doReport() {
  libs=$1
  tapLibs=$2
  outputName="out/${3}.ansi"
  command=$4

  rm -f $outputName
  for lib in "${libs[@]}"
  do
    header "${lib}" >> $outputName
    script -q /dev/null -c "$command eval ${!lib}" >> $outputName
  done

  for lib in "${tapLibs[@]}"
  do
    header "${lib}" >> $outputName
    script -q /dev/null -c "$command $tape | ${!lib}" >> $outputName
  done

  header "zr" >> $outputName
  script -q /dev/null -c "$command $zoraReportZr" >> $outputName
}