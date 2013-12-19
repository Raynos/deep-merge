var test = require("tape")

var MultiMerge = require("../multiple")
var DeepMerge = require("../index")
var deepmerge = DeepMerge(function (target, source) {
    return [].concat(target, source)
})

test("deep merge array", function (assert) {
    var a = [1, 2, 3]
    var b = [4, 5, 6]
    var res = deepmerge(a, b)

    assert.deepEqual(a, [1, 2, 3])
    assert.deepEqual(b, [4, 5, 6])
    assert.deepEqual(res, [1, 2, 3, 4, 5, 6])

    assert.end()
})

test("deep merge objects", function (assert) {
    var a = { foo: "bar", bar: "baz" }
    var b = { bar: "foo", baz: "bar" }
    var res = deepmerge(a, b)

    assert.deepEqual(a, { foo: "bar", bar: "baz" })
    assert.deepEqual(b, { bar: "foo", baz: "bar" })
    assert.deepEqual(res, {
        foo: "bar",
        bar: ["baz", "foo"],
        baz: "bar"
    })

    assert.end()
})

test("deep merge arbitrary types", function (assert) {
    var a = function () {}
    var b = "foobar"
    var res = deepmerge(a, b)

    assert.deepEqual(res, [a, "foobar"])

    assert.end()
})

test("deep merge array and value", function (assert) {
    var a = ["one", "two"]
    var b = "three"
    var res = deepmerge(a, b)

    assert.deepEqual(a, ["one", "two"])
    assert.deepEqual(res, ["one", "two", "three"])

    assert.end()
})

test("gets key for the merging", function (assert) {
    var merge = DeepMerge(function(a, b, key) {
        assert.equal(a, "bar")
        assert.equal(b, "baz")
        assert.equal(key, "foo")
        assert.end()
    })

    merge({ foo: "bar" }, { foo: "baz" })
})

test("deep merging works", function (assert) {
    var merge = DeepMerge(function (a, b) {
        return b
    })

    var orig = {
        a: {
            b: {
                c: "c"
            }
        }
    }

    var res = merge({}, orig)

    assert.equal(res.a.b.c, "c")

    res.a.d = "d"
    assert.equal(orig.a.d, undefined)

    res.a.b.e = "e"
    assert.equal(orig.a.b.e, undefined)

    assert.end()
})

test("multi merge works", function (assert) {
    var merge = MultiMerge(function (a, b) { return b })

    var obj = merge([
        { a: "a" },
        { b: "b" },
        { a: { c: "c" } },
        { a: { d: "d" } },
        { a: { c: "e", f: "f" } },
        { g: { h: "h" } }
    ])

    assert.deepEqual(obj, {
        a: { c: "e", f: "f", d: "d" },
        b: "b",
        g: { h: "h" }
    })
    assert.end()
})
