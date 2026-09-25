import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
test('shows help', async () => {
  const { stdout } = await run(process.execPath, ['bin/cli.js', '--help']);
  assert.match(stdout, /Usage: create-my-pwa/);
});

test('shows version', async () => {
  const { stdout } = await run(process.execPath, ['bin/cli.js', '--version']);
  assert.match(stdout, /create-my-pwa 0\.1\.0/);
});
