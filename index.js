var extend = require("xtend")

module.exports = DeepMerge

function DeepMerge(merger) {
    return deepmerge

    function deepmerge(target, source) {
        if (Array.isArray(source) && Array.isArray(target)) {
            return target.concat(source)
        } else if (isObject(source) && isObject(target)) {
            var result = extend({}, target)
            Object.keys(source).forEach(merge)
            return result
        } else {
            return merger(target, source)
        }

        function merge(key) {
            var sourceValue = source[key]
            var targetValue = target[key]

            if (!(key in target)) {
                result[key] = sourceValue
            } else {
                result[key] = deepmerge(targetValue, sourceValue)
            }
        }
    }
}

function isObject(x) {
    return typeof x === "object" && x !== null
}
