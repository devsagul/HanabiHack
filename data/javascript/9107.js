var fs = require('fs')
var path = require('path')

var dir = path.join(__dirname, 'a-chaining-calls')
var target = path.join(dir, 'write-target')
var file = __filename

var logError = function (err) {
    console.error(err)
}

var handleError = function (callback) {
    return function (err, result) {
        if (err) {
            logError(err)
        } else {
            callback(result)
        }
    }
}

var haveFile = function (content) {
    fs.writeFile(target, content, handleError(verifyWrite))
}

var verifyWrite = function () {
    console.log('Write completed successfully')
}

var writeContentToFile = function () {
    fs.readFile(file, handleError(haveFile))
}

fs.mkdir(dir, handleError(writeContentToFile))
    
    


