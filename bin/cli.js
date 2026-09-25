#!/usr/bin/env node
import('../src/cli.js').catch((error) => { console.error(error.stack || error); process.exit(1); });
