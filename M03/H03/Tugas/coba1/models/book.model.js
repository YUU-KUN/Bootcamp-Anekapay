const mongoose = require('mongoose');

var bukuSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: 'This field is required.'
    },
    author: {
        type: String,
        required: 'This field is required.'
    },
    penerbit: {
        type: String,
        required: 'This field is required.'
    },
    tahunTerbit: {
        type: Number,
        required: 'This field is required.'
    },
    jumlahHalaman: {
        type: Number,
        required: 'This field is required.'
    }
})

mongoose.model('Book', bukuSchema);


