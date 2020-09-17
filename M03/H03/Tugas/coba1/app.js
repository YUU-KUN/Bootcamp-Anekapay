require('./models/db');

const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');

const bookController = require('./controllers/bookController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));

app.set('view engine', 'html');
app.engine('.html', require('hbs').__express);

// app.set('views', path.join(__dirname, 'views'));
// app.engine('.pug', require('pug').__express);
// app.set('view engine', 'pug');

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000 nih~');
});

app.use('/book', bookController);