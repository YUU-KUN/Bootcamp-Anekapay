const port = 3000
const express = require('express')
const mustache = require('mustache')
const app = express()

app.set('view engine', 'mustache')

app.get('/', function (req, res) {
    var data = { titles: 'User Input', username: ''};
    res.render('user', data)
    res.send(req.query.username)
})

app.listen(port, function () {
    console.log('Server berjalan di localhost:' + port)
})