#!/usr/bin/env bash

libs=(tape)

rm -f results.txt

for lib in "${libs[@]}"
do
  echo "" >> results.txt
  echo "${lib}" >> results.txt
  { ./run.sh perf $lib; } 2>&1 | grep real >> results.txt
done