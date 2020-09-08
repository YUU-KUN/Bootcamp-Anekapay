const express = require('express')
const app = express()

const port = 3000
app.listen(port, function () {
    console.log('Servernya berjalan di http://localhost:' + port + ' nih~')
})

var catat = function (req, res, next) {
    console.log('Request ini tercatat')
    next()
}
app.use(catat);


// route "/"
app.get('/', function (req, res, next) {
    console.log('Middleware 1')
    next()
}, function (req, res, next) {
    console.log('Middleware 2')
    req.name = 'YUU'
    next()
}, function (req, res, next) {
    console.log('Middleware 3')
    const err = {
        status: 'Error',
        data: {
            name: req.name
        }
    }
    next(err)
}, function (req, res, next) {
    console.log('Middleware 4')
})

app.use((error, req, res, next) => {
    res.json(error)
})

