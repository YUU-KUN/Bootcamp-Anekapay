const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/BookStore2', {useNewUrlParser: true}, (err)=> {
    if (!err) {
        console.log('Terhubung ke Database!')
    } else {
        console.log('Gagal menghubungkan ke Database:' + err)
    }
})

require('./user.model')
require('./buku.model')