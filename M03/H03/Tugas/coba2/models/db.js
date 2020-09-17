const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Buku', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded. Server berjalan di http://localhost:3000 nih~') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./buku.model');    