const AWS = require('aws-sdk');
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

module.exports = {
  createInvalidation,
};
