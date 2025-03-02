## updated 2025-02-02, node 23.9.0
- new PC
- major simplification
- using hyperfine for bench

## Cold start times

`./run.sh perf`

| ms   | runner      |     ms | runner       |
| ---- | ----------- | -----: | ------------ |
| 15.8 | [bun][46]   |  134.8 | [tape][8]    |
| 56.0 | [notest][1] |  220.2 | [mocha][11]  |
| 57.4 | [best][2]   |  259.5 | [lab][10]    |
| 60.4 | [tehanu][3] |  580.1 | [ava][13]    |
| 60.1 | [xv][6]     |  654.4 | [vitest][45] |
| 61.2 | [zora][5]   |  748.0 | [jest][14]   |
| 66.3 | [uvu][7]    | 1982.1 | [tap][12]    |
| 71.2 | [node][44]  |        |              |

### Notes
- some runners have no output, this makes them faster
- **best** and **notest** are the fastest possible implementations, they are not actual libs.
- **bun** is the fastest because it's native, written in Zig, while node is written in JS?
- the slower runners use **hot reloading (HMR)**, cold start doesn't matter when using in watch mode
- in **watch mode**, some runners achieve "flicker free" reload
- checkout some popularity stats like number of stars, montly downloads, commit activity and others. [1][40], [2][43]

I need to retest watch mode, but **mocha** was a perfect 10 for me. The fastest frameworks are nearly as good, and **vitest** is as well. Vitest achieves it's "flicker free" by replacing the terminal content instead of clearing it between reloads.


## My favorite runner
I'm trying out **bun**, with a custom reporter. It is the **fastest** and has a **familiar syntax**. Also I'm a **minimalist**, libraries with too many features tend to focus on things I don't really need. My testing needs are simple.

**Vitest** is the best one. It is the most active developed and the one with the brighter future, being backed by Evan You, the guy from Vue and VoidZero.

## Usage
1) clone
2) npm install
3) `./run.sh TARGET`

Experiment by modifying `run.sh`. as need

### Examples
```sh
./run.sh perf
./run.sh mocha
mode=equalError ./run.sh mocha # forces an assertion error
```

[Contributing](https://github.com/icetbr/my-projects/blob/main/CONTRIBUTING.md)\
[License (MIT)](https://choosealicense.com/licenses/mit/)


[1]: test/employeeNotestTest.js
[2]: best/best.js
[3]: https://github.com/prantlf/tehanu
[5]: https://github.com/lorenzofox3/zora
[6]: https://github.com/typicode/xv
[7]: https://github.com/lukeed/uvu
[8]: https://github.com/substack/tape
[10]: https://github.com/hapijs/lab
[11]: https://github.com/mochajs/mocha
[12]: https://github.com/tapjs/node-tap
[13]: https://github.com/avajs/ava
[14]: https://github.com/facebook/jest
[40]: https://moiva.io/?npm=@hapi/lab+ava+jasmine+jest+mocha+tap+tape+tehanu+uvu+xv+zora
[43]: https://npmtrends.com/@hapi/lab-vs-ava-vs-baretest-vs-jasmine-core-vs-jest-vs-mocha-vs-tap-vs-tape-vs-tehanu-vs-uvu-vs-zora
[44]: https://nodejs.org/api/test.html
[45]: https://vitest.dev/
[46]: https://bun.sh/docs/cli/test

