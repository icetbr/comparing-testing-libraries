#!/usr/bin/env node

import createReporter from './index.js'

const reporter = createReporter()

process.stdin
  .pipe(reporter)
  .pipe(process.stdout)
