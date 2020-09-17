const mongoose = require('mongoose');

var keranjangSchema = new mongoose.Schema({
    pembeli: {
        type: String,
    },
    total: {
        type: Number
    },
    tanggal: {
        type: Number
    },
});


mongoose.model('Keranjang', keranjangSchema);