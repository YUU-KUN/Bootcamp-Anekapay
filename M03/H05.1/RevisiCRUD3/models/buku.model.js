const mongoose = require('mongoose');

var bukuSchema = new mongoose.Schema({
    nama: {
        type: String,
    },
    author: {
        type: String
    },
    penerbit: {
        type: String
    },
    tahunTerbit: {
        type: Number
    },
    jumlahHalaman: {
        type: Number
    },
    harga: {
        type: Number
    }
});

// Custom validation for email
// employeeSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');

mongoose.model('Buku', bukuSchema);