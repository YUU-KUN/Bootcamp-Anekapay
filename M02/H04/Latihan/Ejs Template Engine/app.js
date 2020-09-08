const port = 3000
const express = require('express')
const app = express()

app.set('view engine', 'ejs')

// app.get('/', function(req, res) {
//     res.render('user', {
//         username:'',
//         title:'EJS',
//         message:'',
//     })
//     res.send(req.query.username, message='Hello ')
// })


app.get('/', function (req, res) {
    var data = { title: 'Your Name in EJS', message: 'Hello '+ req.query.username, username: ''};
    res.render('user', data)
    res.send(req.query.username)
})

app.listen(port, function () {
    console.log('Server berjalan di localhost:' + port)
})