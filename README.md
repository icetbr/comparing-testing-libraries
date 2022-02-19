## Cold start times in seconds

| 10 restarts      |      |                 |      | 100 restarts      |      |
|------------------|:----:|-----------------|:----:|-------------------|:----:|
| [notest][1]      | 0,27 | [tapeReport][8] | 0,81 | [notest][1]       | 2,55 |
| [best][2]        | 0,29 | [tape][8]       | 0,84 | [best][2]         | 2,49 |
| [tehanu][3]      | 0,31 | [pta][9]        | 1,00 | [tehanu][3]       | 2,80 |
| [baretest][4]    | 0,34 | [lab][10]       | 1,25 | [baretest][4]     | 2,96 |
| [zora][5]        | 0,34 | [mocha][11]     | 1,74 | [xv][6]           | 2,96 |
| [xv][6]          | 0,38 | [tap][12]       | 2,98 | [zora][5]         | 3,22 |
| [uvu][7]         | 0,44 | [ava][13]       | 6,13 | [uvu][7]          | 4,32 |
| [zoraReport][5]  | 0,49 | [jest][14]      | 6,87 | [zoraReport][5]   | 4,67 |

> updated 2022-02-19

This is my favorite metric. While coding, I run only one test at a time. This tells how much time it takes to "refresh" my test output. This table shows the results of running `time node test/myTest.js` 10/100 times (see [perf.sh](./perf.sh))

I tried to be fair, but some runners have no output, this makes them faster. Also **esm** modules are a little slower (**xv** is esm only)

**Best** and **Notest** are the fastest possible implementations, they are not actual libs.

**Jest** and **Ava** scores poorly here because they rely on **hot reloading (HMR)**. It takes a while to load the first time, but subsequent runs are comparable to the fastests libs. Some libs like **Mocha's native watch** mode makes subsequent runs faster as well.

Bear in mind that this is the result of 10/100 runs. So, a **Baretest** run might take 33ms and Tape 80ms. Ask yourself if this will make a difference, these are very small numbers.

Checkou some [stats][40]


### Watch mode
My impressions based on observation. 10 means a flicker-free instant feedback

|          |    |
|----------|----|
| mocha    | 10 |
| zora     |  9 |
| tape     |  8 |
| jest     |  7 |
| lab      |  7 |
| ava      |  6 |

## Notable mentions
Minimalist and somewhat interesting new test runners
- [g-test-runner][15]: zero dependency, many features, like "rerun only failed tests"
- [natr][16]: [riteway][17] inspired
- [oletus][18]: zero configuration/dependency, **multi thread**!
- [beartest][19]: jest syntax, less features, faster


## What I'm looking for in a testing experience
- **fast single test run**
  - "flicker free" watch mode, that is I hit "CTRL + S" and VScode's terminal shows my test result without even blinking
- **pretty print string comparison diff**
  - I use almost exclusively deep equal comparison in all of my tests
- **async and esm support**
- **no special syntax**
  - it should be easy to change between testing libraries
  - makes for a more consistent experience when reading other people code with different test frameworks
- **clean stack traces**
  - I only need one line of stacktrace to find my error, I don't want it to be the 5th of 10 lines
- **clear terminal before run**
- **minimalist output**
- **bail on error**
  - if the change I made broke hundreds of test, I don't need to see all of them
- **easy toggle serial/parallel tests**
  - unit run in parallel, integration in serial


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
- **Vitest** is way too slow right now, it took ~20s in 120 runs
- `bash script` over `npm scripts` because it's faster and more flexible
- The previous version of this README posted at dev.to: [DX comparison of javascript testing libraries][41]

## How to run
1) clone
2) npm install
3) pick your target

**Formats**
- `equalError`: how an equality error looks like
- `exception`: how an equality error looks like
- `mochaAssert`: how mocha shows an equality error using different assert libs
- `perf`: runs a simple performance test, outputs to `result.txt`
  - omit the lib name to test them all
- `nativeWatcher` will use the lib's built in watch mechanism

```
[mode=(equalError|exception)] ./run.sh libName
[mode=(equalError|exception)] ./run.sh nativeWatcherName
[mode=(equalError|exception)] ./run.sh watcherName libName
[mode=(equalError|exception)] ./run.sh perf libName
mode=(assert|chai|should|jest|lab|unexpect) ./run.sh mochaAssert
```

**Examples**
```sh
./run.sh mocha
mode=exception ./run.sh mocha
mode=jest ./run.sh mochaAssert
./run.sh mochaWatch
./run.sh nodemon lab
./run.sh chockidar lab
./run.sh onchange zora
./run.sh perf jest
```

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