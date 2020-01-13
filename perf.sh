#!/usr/bin/env bash

libs=( mocha jest ava lab tape tap tapeReport zora zoraReport zoraSingle)

rm results.txt

for lib in "${libs[@]}"
do
  echo "" >> results.txt
  echo "${lib}" >> results.txt
  { ./run.sh perf $lib; } 2>&1 | grep real >> results.txt
done