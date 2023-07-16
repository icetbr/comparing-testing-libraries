## Changelog highlights: updated 2023-07-15, node 20.3.1
- all testes using ESM
- some tests got faster (mocha, jest, ava)
- including results of **vitest** and **native**
- ava watch got way better, jest remained the same, vitest is amazing

## Cold start times (in seconds) and a watch mode grade (0 - 10)

| 10 restarts     |      |                 |      | 100 restarts    |      |   | watch        |     |
|-----------------|:----:|-----------------|:----:|-----------------|:----:|---|--------------|-----|
| [notest][1]     | 0,27 | [tape][8]       | 0,90 | [notest][1]     | 2,57 |   | [mocha*][11] | 10  |
| [best][2]       | 0,30 | [tapeReport][8] | 0,97 | [best][2]       | 2,71 |   | [native][44] | 9.5 |
| [baretest][4]   | 0,33 | [pta][9]        | 1,06 | [xv][6]         | 2,94 |   | [vitest][45] | 9   |
| [tehanu][3]     | 0,34 | [mocha][11]     | 1,68 | [tehanu][3]     | 2,98 |   | [zora][5]    | 9   |
| [xv][6]         | 0,34 | [lab][10]       | 1,98 | [baretest][4]   | 3,37 |   | [tape][8]    | 9   |
| [uvu][7]        | 0,38 | [tap][12]       | 2,90 | [zora][5]       | 3,62 |   | [lab][10]    | 8   |
| [native][44]    | 0,40 | [ava][13]       | 4,27 | [uvu][7]        | 3,66 |   | [ava][13]    | 8   |
| [zora][5]       | 0,40 | [jest][14]      | 4,96 | [native][44]    | 3,98 |   | [jest][14]   | 7   |
| [zoraReport][5] | 0,71 | [vitest][45]    | 8,10 | [zoraReport][5] | 8,19 |   |              |     |

This table shows the results of running `time node test/myTest.js` 10/100 times (see [perf.sh](./perf.sh)). The **watch** column is how fast can a rerun get with `nodemon` or `--watch` flag. It was eyeball measured, 10 meaning a flicker-free instant feedback.

Some runners have no output, this makes them faster. Also **esm** modules are a little slower (**xv** is esm only)

**Best** and **Notest** are the fastest possible implementations, they are not actual libs.

**Jest** and **Ava** scores poorly here because they rely on **hot reloading (HMR)**. It takes a while to load the first time, but subsequent runs are comparable to the fastests libs. Some libs like **Mocha's native watch** mode makes subsequent runs faster as well.

Bear in mind that this is the result of 10/100 runs. So, a **Baretest** run might take 33ms and Tape 80ms. Ask yourself if this will make a difference, these are very small numbers.

**Mocha** watch with `require`(CJS) is a perfect 10.

<!-- **TODO**: test overhead of many files and many tests -->


## Choosing a test runner

There are 3 **deal breaker** features every test runner must have:
- **fast rerun**: write, save, see, the most essential feedback loop
- **familiar syntax**: jest/mocha compatible, easy to switch between runners
- **esm support**: it's JS future

Nearly all runners fails the familiarity test.
Checkout some popularity stats like number of stars, montly downloads, commit activity and others. [1][40], [2][43]

### Notable mentions
Minimalist and somewhat interesting new test runners
- [g-test-runner][15]: zero dependency, many features, like "rerun only failed tests"
- [natr][16]: [riteway][17] inspired
- [oletus][18]: zero configuration/dependency, **multi thread**!
- [beartest][19]: jest syntax, less features, faster


## Additional features

- **easy toggle serial/parallel tests**
  - unit runs in parallel, integration in serial
  - parallel !== serial, not all are trully "multi thread"
- **pretty print string comparison diff**
- **clean stack traces**
  - I only need one line of stacktrace to find my error, I don't want it to be the 5th of 10 lines
- **clear terminal before run**
- **minimalist output**
- **bail on error**
  - if the change I made broke hundreds of test, I don't need to see all of them
- mock, cover, snapshoot


## My impressions
These are mostly nitpicking based on first impressions, they are all great libraries.

### Jest
- initial configuration: hard if not using defaults
  - needed to include testEnvironment
    - huge performance cost otherwise (~80% on cold start tests)
  - needed to include testRegex
    - didn't recognize my command line pattern
- very active development
- too many lines of useless output when in watch mode
- very user focused, readability in mind (ex: many useful assertions)
- bail doesn't work for tests in the same file (bug)
- problems identifying test files (ex: camel case userTest.js vs user.test.js)
- polluted diff result, impossible to have inline diff
- ridiculously slow cold start
- Jest doesn't always try to run test suites in parallel
  - weird errors when improper mocking
- expect doesn't accept error messages
- asymetricMatchers produce output structure different then equals

### Mocha
- very active development
- the best **flicker free** experience
- questionable choices: tests don't force exit when done
- stack trace clean level: 1 (minor details)

### Ava
- very active development
- no support for nested tests
- parallel by default, but can use --serial cli
- annoying messages in watch mode
- the slowest of all watchers

### Lab
- somewhat active development
- best (not by much) equal diff
- makes sense to use if you're using **hapi** (I am)
- stack trace clean level: 2 (some internal calls)
- flicker speed: has some delay

### Tape
- no support for async (use tape-promise or other)
- needs a tap reporter
- special syntax (`t.test`)

### Zora
- interesting idea, it is "just" javascript
- fast no matter how you run it
- paralel tests by default, it takes extra work to make then synchronous, bad for integration tests
- weird integrations with nodemon that makes it sometimes hang
- special syntax (`t.test`, `await test`, and others)

### uvu
- [no reporters support](https://github.com/lukeed/uvu/pull/107)
- no parallelization
- special syntax: test grouping


### Notes
- other benchmarks
  - [tehanu](https://github.com/prantlf/tehanu/tree/master/benchmarks)
  - [zora](https://github.com/lorenzofox3/zora/tree/master/perfs)
  - [uvu](https://github.com/lukeed/uvu#benchmarks)
- **Ava** and **Jest** have an aditional large start cost when first run
- to test this yourself, run `./perf.sh`
- `bash script` over `npm scripts` because it's faster and more flexible
- The previous version of this README posted at dev.to: [DX comparison of javascript testing libraries][41]

## Usage
1) clone
2) npm install
3) pick your target

Look inside `run.sh` and `scripts` for targets.

**Formats**
- `equalError`: forces an assertion error
- `nativeWatcherName` will use the lib's built in watch mechanism

### Simple targets
```sh
[mode=equalError] ./run.sh [10Times | 100Times] libName
[mode=equalError] ./run.sh nativeWatcherName
[mode=equalError] ./run.sh watcherName libName
```
### Special targets
```sh
mode=(assert|chai|should|jest|lab|unexpect) ./run.sh mochaAssert

./run.sh genBaseTests
./run.sh genMediumTests
./run.sh genLargeTests

./run.sh perfReport
./run.sh diffErrorsReport
```

### Examples
```sh
./run.sh mocha
mode=equalError ./run.sh mocha
mode=jest ./run.sh mochaAssert
./run.sh mochaWatch
./run.sh 10Times mocha
./run.sh nodemon lab
./run.sh chockidar lab
./run.sh onchange zora
```

## How I use this
- `./run.sh perfReport` generates a `txt` from which I create the performance table
- `./run.sh diffErrorsReport` generates `.ansi` files so I can analyze the results

**USE [VSCODE-ANSI][42] TO SEE THE ANSI FILES IN PREVIEW MODE**

[Contributing](https://github.com/icetbr/my-projects/blob/main/CONTRIBUTING.md)\
[License (MIT)](https://choosealicense.com/licenses/mit/)

<!-- ## todo: 10k tests -->

<!-- https://github.com/japa/core -->
<!-- Testman https://gist.github.com/earonesty/2a8ac3a03e88ac90292cc28c823eb80b -->
<!-- https://www.sohamkamani.com/blog/javascript/making-a-node-js-test-runner/ -->

[1]: test/employeeNotestTest.js
[2]: best/best.js
[3]: https://github.com/prantlf/tehanu
[4]: https://github.com/volument/baretest
[5]: https://github.com/lorenzofox3/zora
[6]: https://github.com/typicode/xv
[7]: https://github.com/lukeed/uvu
[8]: https://github.com/substack/tape
[9]: https://github.com/lorenzofox3/zora/tree/master/pta
[10]: https://github.com/hapijs/lab
[11]: https://github.com/mochajs/mocha
[12]: https://github.com/tapjs/node-tap
[13]: https://github.com/avajs/ava
[14]: https://github.com/facebook/jest
[15]: https://github.com/ged-odoo/g-test-runner
[16]: https://github.com/krieselreihe/natr
[17]: https://github.com/ericelliott/riteway
[18]: https://github.com/bearror/oletus
[19]: https://github.com/rubber-duck-software/beartest
[40]: https://moiva.io/?npm=@hapi/lab+ava+baretest+jasmine+jest+mocha+tap+tape+tehanu+uvu+xv+zora
[41]: https://dev.to/icetbr/developer-ux-comparison-of-javascript-testing-libraries-2b9n
[42]: https://marketplace.visualstudio.com/items?itemName=iliazeus.vscode-ansi
[43]: https://npmtrends.com/@hapi/lab-vs-ava-vs-baretest-vs-jasmine-core-vs-jest-vs-mocha-vs-tap-vs-tape-vs-tehanu-vs-uvu-vs-zora
[44]: https://nodejs.org/api/test.html
[45]: https://vitest.dev/
