const express = require('express')
const app = express()
const port = 3000

app.listen(port, function () {
    console.log('Server berjalan di localhost:' + port)
})

// Routing
app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.render('home',
    { titles: 'User Input', message: 'Hello '+ req.query.username, })
    res.send(req.query.username)
})

// app.get('/username', function (req, res) {
//    res.send( 'Hello '+ req.query.username)
//    res.render('home',
//         { titles: 'Ganti Nama',})
//     // res.render('form',
//     //     { titles: 'User Input', message: 'Hello '+req.query.username, })
// })

