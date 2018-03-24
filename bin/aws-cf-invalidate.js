#! /usr/bin/env node

const chalk = require('chalk');
const ora = require('ora');
const { createInvalidation } = require('../index');

const [distributionId, ...invalidationPaths] = [...process.argv.slice(2)];

if (distributionId == null || distributionId.endsWith('help')) {
  console.log(
    `${chalk.bold(
      'aws-cf-invalidate'
    )}: A tool to invalidate AWS CloudFront distributions`
  );
  console.log(
    `${chalk.bold('Usage:')} aws-cf-invalidate ${chalk.gray(
      '<distributionId>'
    )} ${chalk.gray('[path1 path2 path3]')}`
  );
  console.log(
    `${chalk.bold('Example:')} aws-cf-invalidate E71823NB index.html main.js
    `
  );
  console.log(
    `${chalk.underline(
      'NOTE:'
    )} Paths are optional. If none are provided, all paths for the distribution are invalidated.`
  );
  process.exit(0);
}

async function main() {
  const spinner = ora('Creating invalidation...').start();
  try {
    await createInvalidation(distributionId, invalidationPaths);
    spinner.stopAndPersist({
      symbol: chalk.green('✔'),
      text: 'Success!',
    });
    process.exit(0);
  } catch (e) {
    spinner.stopAndPersist({
      symbol: chalk.red('✖'),
      text: `${chalk.red('ERROR:')} ${e.message}`,
    });
    process.exit(1);
  }
}

main();
