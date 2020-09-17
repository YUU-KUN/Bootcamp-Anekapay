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
    }
});

mongoose.model('Buku', bukuSchema);