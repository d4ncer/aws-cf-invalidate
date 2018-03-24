# aws-cf-invalidate #

Invalidate a CloudFront distribution.

## Usage ##

**CLI**

```sh
aws-cf-invalidate <distributionId> [path1 path2 path3]
```

The `path`s are optional; the entire distribution will be invalidated if none are provided.

**API**

`createInvalidation(distributionId: string, paths?: string[]): Promise<{} | Error>`

```js
const { createInvalidation } = require('aws-cf-invalidate');

createInvalidation('EBAC1238', ['index.html', 'main.js'])
  .then(invalidation => console.log(invalidation))
  .catch(e => console.error(e));
```

`paths` is optional. If not passed, *all* paths for the distribution will be invalidated.
