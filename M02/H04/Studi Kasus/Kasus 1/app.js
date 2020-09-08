const express = require('express')
const app = express()
const port = 3000
const server = 'http://localhost'
app.listen(port, function () {
    console.log('Server berjalan di' + server + ':' + port + ' nich~')
})

app.get('/', function (req, res) {
    res.send('THIS IS CALCULATOR HOME PAGE')
})

app.get('/tambah/:angka1/:angka2', function (req, res) {

    let angka1 = req.params.angka1
    let angka2 = req.params.angka2
    let hasil = angka1 + angka2
    res.send('Hasilnya adalah ' + hasil)
})
app.get('/kurang/:angka1/:angka2', function (req, res) {

    let angka1 = req.params.angka1
    let angka2 = req.params.angka2
    let hasil = angka1 - angka2
    res.send('Hasilnya adalah ' + hasil)
})
app.get('/kali/:angka1/:angka2', function (req, res) {

    let angka1 = req.params.angka1
    let angka2 = req.params.angka2
    let hasil = angka1 * angka2
    res.send('Hasilnya adalah ' + hasil)
})
app.get('/bagi/:angka1/:angka2', function (req, res, next) {

    let angka1 = req.params.angka1
    let angka2 = req.params.angka2
    let hasil = angka1 / angka2
    if (angka2 != 0) {
        res.send('Hasilnya adalah ' + hasil)
        // res.send("ERROR: Tidak boleh mengisikan angka 0 sebagai pembagi!")
    } else {
        next()
    }
}, function (req, res, next) {
    setTimeout(function () {
        try {
            throw new Error('ERROR: Tidak boleh mengisikan angka 0 sebagai pembagi!')
        } catch (err) {
            next(err)
        }
    }, 100)
})