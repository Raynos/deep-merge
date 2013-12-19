var DeepMerge = require('./index.js')

module.exports = MultipleMerge

function MultipleMerge(merger) {
    var merge = DeepMerge(merger)

    return multiMerge

    function multiMerge(objects) {
        var result = objects[0]
        var sources = objects.slice(1)

        sources.forEach(function (source) {
            result = merge(result, source)
        })

        return result
    }
}
