# deep-merge

[![build status][1]][2] [![dependency status][3]][4]

[![browser support][5]][6]

Deep merge objects with custom merging logic

## Example

When you create a merge "strategy" you can configure how two
values should merge when they have the same key. For example
you may want them to be combined into a single array.

```js
var DeepMerge = require("deep-merge")
var assert = require("assert")

var merge = DeepMerge(function mergeStrategy(target, source, key) {
    return [].concat(target, source)
})

var res = merge({
    foo: ["hello"]
}, {
    foo: "goodbye"
})

assert.deepEqual(res, { foo: ["hello", "goodbye"] })
```

By default objects will recursely call your `mergeStrategy` on
your the values for a key and construct a new object with the
key and the value returned from your merge

### Merging multiple objects

```js
var DeepMerge = require("deep-merge/multiple")
var merge = DeepMerge(function (a, b) {
    return b
})

var obj = merge([
    { a: "a" },
    { b: "b" },
    { c: { d: "d" } },
    { c: { e: "e" } }
])

assert.deepEqual(obj.c, { d: "d", e: "e" })
```

## Installation

`npm install deep-merge`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/deep-merge.png
  [2]: http://travis-ci.org/Raynos/deep-merge
  [3]: http://david-dm.org/Raynos/deep-merge/status.png
  [4]: http://david-dm.org/Raynos/deep-merge
  [5]: http://ci.testling.com/Raynos/deep-merge.png
  [6]: http://ci.testling.com/Raynos/deep-merge
