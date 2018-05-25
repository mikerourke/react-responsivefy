'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const jest = require('jest');
const argv = process.argv.slice(2);

/**
 * If the `test` command was called in a Circle CI instance, append the `--ci` and the
 *    `--onlyChanged` CLI options to Jest runner to ensure the build doesn't fail.
 * @see https://facebook.github.io/jest/docs/en/cli.html#ci
 * @see https://facebook.github.io/jest/docs/en/cli.html#onlychanged
 */
if (process.env.CIRCLECI || process.env.CI) {
  argv.push('--ci=true', '--onlyChanged=true');
}

const jestArgs = argv.concat([
  '--env=jsdom',
  '--coverageReporters=lcov',
  '--config=jest.config.json',
]);

jest.run(jestArgs);
