const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/book', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./book.model');

// // include mongoose in our project 
// const mongoose = require('mongoose');
// // open a connection to the aneka database on our locally running instance of MongoDB
// mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })
// // We now need to get notified if we connect successfully or if a connection error occurs
// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function () {
//     console.log('We are connectd!')
// })