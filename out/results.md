| Command | Mean [ms] | Min [ms] | Max [ms] | Relative |
|:---|---:|---:|---:|---:|
| `node test/special/notestTest.js` | 56.0 ± 2.0 | 50.3 | 60.2 | 3.54 ± 0.22 |
| `node test/bestTest.js` | 57.4 ± 4.5 | 51.5 | 85.7 | 3.63 ± 0.34 |
| `bun test ./test/bunTest.js` | 15.8 ± 0.8 | 13.7 | 17.7 | 1.00 |
| `node test/tehanuTest.js` | 60.4 ± 3.6 | 56.0 | 77.3 | 3.82 ± 0.30 |
| `node ./test/zoraTest.js` | 61.2 ± 2.0 | 56.7 | 65.8 | 3.87 ± 0.23 |
| `xv test/special/xvTest.js` | 60.1 ± 4.1 | 55.2 | 76.6 | 3.80 ± 0.32 |
| `node --test-reporter dot ./test/nativeTest.js` | 71.2 ± 3.8 | 66.6 | 91.1 | 4.50 ± 0.33 |
| `node test/uvuTest.js` | 66.3 ± 2.2 | 61.8 | 72.0 | 4.19 ± 0.26 |
| `tape test/tapeTest.js` | 134.8 ± 2.3 | 129.5 | 138.5 | 8.52 ± 0.46 |
| `mocha -r chai/register-expect.js --inline-diffs --bail --ui=tdd --leaks --reporter min test/mochaTest.js` | 220.2 ± 5.8 | 214.3 | 234.0 | 13.93 ± 0.80 |
| `lab test/labTest.js` | 259.5 ± 3.4 | 253.1 | 264.1 | 16.41 ± 0.86 |
| `tap --disable-coverage ./test/tapTest.js` | 1982.1 ± 30.7 | 1947.5 | 2045.0 | 125.33 ± 6.68 |
| `ava --serial --fail-fast test/avaTest.js` | 580.1 ± 21.1 | 556.0 | 631.4 | 36.68 ± 2.30 |
| `vitest` | 654.4 ± 26.7 | 621.7 | 721.2 | 41.38 ± 2.70 |
