const express = require('express')
const app = express()
const port = 3000

app.listen(port, function () {
    console.log('server berjalan pada http://localhost:' + port)
})

// ---ROUTE METHODS---
// Route GET method
app.get('/', function (req, res) {
    res.send('<h1>Hello World</h1> <strong>GET</strong> Request')
})

// Route POST method
app.post('/', function (req, res) {
    res.send('<h1>Hello World</h1> <strong>POST</strong> Request')
})

// Route ALL method
app.all('/secret', function (req, res) {
    console.log('Mengakses secret..')
    next() // lanjut ke handler selanjutnya
})

// ROUTE PATHS
app.get('/home', function (req, res) {
    res.send('This Is A Root Page')
})
app.get('/user', function (req, res) {
    res.send('This Is A User Page')
})
app.get('/Product', function (req, res) {
    res.send('This Is A Product Page')
})
app.get('/random.text', function (req, res) {
    res.send('random.text')
})
app.get('/ab?cd', function (req, res) {
    res.send('ab?cd')
})
app.get('/ab+cd', function (req, res) {
    res.send('ab+cd')
})
app.get('/ab*cd', function (req, res) {
    res.send('ab*cd')
})
app.get('/ab(cd)?e', function (req, res) {
    res.send('ab(cd)?e')
})
app.get(/x/, function (req, res) {
    res.send('/x/')
})
app.get(/.*fly$/, function (req, res) {
    res.send('/.*fly$/')
})

// ROUTE PARAMETERS
// var router = express.Router()
// Route path: /users/: userId / books /: bookId
// Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "bookId": "8989" }

// app.get('/users/:userId/books/:bookId', function (req, res) {
//     res.send(req.params)
// })

// Route path: /flights/:from-:to
// Request URL: http://localhost:3000/flights/LAX-SFO
// req.params: { "from": "LAX", "to": "SFO" }

// Route path: /plantae/:genus.:species
// Request URL: http://localhost:3000/plantae/Prunus.persica
// req.params: { "genus": "Prunus", "species": "persica" }

// Route path: /user/:userId(\d+)
// Request URL: http://localhost:3000/user/42
// req.params: {"userId": "42"}

// ROUTE HANDLER
app.get('/example/a', function (req, res) {
    res.send('Hello from A')
})

app.get('/example/b', function (req, res, next) {
    console.log('responnya bakal dikirim sama fungsi berikutnya..')
    next()
}, function (req, res) {
    res.send('Hello from B')
})

var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}
var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}
var cb2 = function (req, res) {
    res.send('Hello from C!')
}
app.get('/example/c', [cb0, cb1, cb2])

var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('responnya bakal dikirim sama fungsi berikutnya..')
    next()
}, function (req, res) {
    res.send('Hello from D!')
})

// APP ROUTE
app.route('/mobil')
    .get(function (req, res) {
        res.send('Sewa Mobil')
    })
    .post(function (req, res) {
        res.send('Tambah Data Mobil')
    })
    .put(function (req, res) {
        res.send('Update Data Mobil')
    })


// EXPRESS.ROUTER

var birds = require('./birds')
app.use('/birds', birds)


