# aws-cf-invalidate #

Invalidate a CloudFront distribution.

## Usage ##

```sh
aws-cf-invalidate <distributionId> [path1 path2 path3]
```

The `path`s are optional; the entire distribution will be invalidated if none are provided.
