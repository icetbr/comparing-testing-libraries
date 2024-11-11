runPerfReport() {
  libs=$1
  fastestLibs=$2
  outputName="out/perfResults.txt"

  rm -f $outputName

  echo "ALL LIBS 10 times" >> $outputName

  for lib in "${libs[@]}"
  do
    echo "" >> $outputName
    echo "${lib}" >> $outputName
    { 10Times $lib; } 2>&1 | grep real >> $outputName
    sleep 1
  done

  sleep 2

  echo "" >> $outputName
  echo "----------------------" >> $outputName
  echo "FASTEST LIBS 100 times" >> $outputName

  for lib2 in "${fastestLibs[@]}"
  do
    echo "" >> $outputName
    echo "${lib2}" >> $outputName
    { 100Times $lib2; } 2>&1 | grep real >> $outputName
    sleep 1
  done
}
