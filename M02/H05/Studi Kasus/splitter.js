const express = require('express')
const app = express()
const port = 3000
app.listen(port, function () {
    console.log('Server berjalan di http://localhost:' + port + ' nich~')
})

app.get('/:karakter', function (req, res, next) {
    var x = req.params.karakter
    var split = x.split('')
    var d = x.length
    var hasil1 = ''
    var hasil2 = ''
    for (let i = 0; i <= d - 1; i++) {
        if (split[i].match(/[a-z]/i)) {
            hasil1 = split[i]
        } else {
            hasil1 = ''
        }
        hasil2 += hasil1
    }
    res.send(hasil2)
    next()
}, function (req, res, next) {
    req.error = 'Something is not right. I can feel it!'
    next()
}, function (req, res, next) {
    const err = {
        status: 'Error',
        data: {
            error: req.error
        }
    }
    next(err)
})

