#!/usr/bin/env bash

libs=(jest ava tap mocha lab pta tape tapeReport zoraReport uvu xv zora baretest tehanu best notest)
fastestLibs=(xv zoraReport zora uvu baretest tehanu best notest)
# fastestLibs=(zoraEsm zora)
# fastestLibs=(best bestEsm)
# fastestLibs=(xv xvEsm)
# fastestLibs=(tehanu tehanuEsm)
# fastestLibs=(notest notestEsm)
# fastestLibs=(zoraEsm notestEsm bestEsm)
# fastestLibs=(bestEsm zoraEsm bestFull)

rm -f results.txt

echo "ALL LIBS 10 times" >> results.txt

for lib in "${libs[@]}"
do
  echo "" >> results.txt
  echo "${lib}" >> results.txt
  { ./run.sh perf $lib; } 2>&1 | grep real >> results.txt
  sleep 1
done

sleep 2

echo "" >> results.txt
echo "----------------------" >> results.txt
echo "FASTEST LIBS 100 times" >> results.txt

for lib in "${fastestLibs[@]}"
do
  echo "" >> results.txt
  echo "${lib}" >> results.txt
  { ./run.sh perf100 $lib; } 2>&1 | grep real >> results.txt
  sleep 1
done