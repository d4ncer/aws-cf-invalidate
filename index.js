#! /usr/bin/env node

const AWS = require('aws-sdk');
const chalk = require('chalk');
const ora = require('ora');

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
}

const cloudfront = new AWS.CloudFront();

function createInvalidation(distId, paths) {
  const invalidPaths =
    Array.isArray(paths) && paths.length > 0 ? paths : ['/*'];
  return new Promise((resolve, reject) => {
    cloudfront.createInvalidation(
      {
        DistributionId: distId,
        InvalidationBatch: {
          CallerReference: new Date().toISOString(),
          Paths: {
            Quantity: invalidPaths.length,
            Items: invalidPaths,
          },
        },
      },
      (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      }
    );
  });
}

async function main() {
  const spinner = ora('Creating invalidation...').start();
  try {
    await createInvalidation(distributionId, invalidationPaths);
    spinner.stopAndPersist({
      symbol: chalk.green('✔'),
      text: 'Success!',
    });
  } catch (e) {
    spinner.stopAndPersist({
      symbol: chalk.red('✖'),
      text: 'Failed!',
    });
    console.log(e);
  }
}

main();
