[DX comparison of javascript testing libraries](https://dev.to/icetbr/developer-ux-comparison-of-javascript-testing-libraries-2b9n)

|  10 restarts       || 100 restarts      ||
|-------------|-------|------------|-------|
| notest      |  0,28 | notest     | 2,41  |
| best        |  0,28 | best       | 2,54  |
| tehanu      |  0,30 | tehanu     | 2,65  |
| baretest    |  0,32 | baretest   | 2,76  |
| zora        |  0,33 | xv         | 2,83  |
| xv          |  0,37 | zora       | 2,97  |
| uvu         |  0,44 | uvu        | 4,09  |
| zoraReport  |  0,47 | zoraReport | 4,62  |
| tapeReport  |  0,81 |
| tape        |  0,89 |
| pta         |  0,92 |
| lab         |  1,29 |
| mocha       |  1,63 |
| tap         |  2,63 |
| ava         |  5,30 |
| jest        |  7,24 |

**Cold start times in seconds, updated 2022-02-17, explanations bellow**


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
- need a tap reporter
- special syntax (`t.test`)

### Zora
- interesting idea, it is "just" javascript
- fast no matter how you run it
- paralel tests by default, it takes extra work to make then synchronous, bad for integration tests
- weird integrations with nodemon that makes it sometimes hang
- the tap reporters I like are old and unmaintained
- special syntax (`t.test`, `await test`, and others)

### uvu
- [no reporters support](https://github.com/lukeed/uvu/pull/107)
- no parallelization
- special syntax: test grouping


## Cold start

This is my favorite metric. While coding, I run only one test at a time. This tells how much time it takes to "refresh" my test output. This table shows the results of running `time node test/myTest.js` 10/100 times (see [perf.sh](./perf.sh))

I tried to be fair, but I can run some runners with no output, this makes them faster. Also **esm** modules are a little slower (**xv** is esm only)

**Best** and **Notest** are the fastest possible implementations, they are not actual libs.

**Jest** and **Ava** scores poorly here because they rely on **hot reloading (HMR)**. It takes a while to load the first time, but subsequent runs are comparable to the fastests libs. Some libs like **Mocha's native watch** mode makes subsequent runs faster as well.

Also, remember that this is the result of 10/100 runs. So, a **Baretest** run might take 33ms and Tape 80ms. Ask yourself if this will make a difference, these are very small numbers.

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

### Notes
- other benchmarks
  - [zora](https://github.com/lorenzofox3/zora/tree/master/perfs)
- **Ava** and **Jest** have an aditional large start cost when first run
- to test this yourself, run `./perf.sh`
- **Vitest** is way too slow right now, it took ~20s in 120 runs
- `bash script` over `npm scripts` because it's faster and more flexible

<!-- icet
dull, sober (antonym to jest)
best -->

<!-- https://github.com/japa/core -->