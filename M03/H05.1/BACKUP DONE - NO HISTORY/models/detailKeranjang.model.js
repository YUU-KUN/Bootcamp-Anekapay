const mongoose = require('mongoose');

var detailKeranjangSchema = new mongoose.Schema({
    nama: {
        type: String,
    },
    harga: {
        type: Number
    },
    jumlah: {
        type: Number
    },
    subtotal: {
        type: Number
    },
});


mongoose.model('DetailKeranjang', detailKeranjangSchema);