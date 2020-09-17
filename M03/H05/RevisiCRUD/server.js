require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser')
const port = 3000
var cookieSession = require('cookie-session')


const adminController = require('./controllers/adminController')
const userController = require('./controllers/userController')
const bukuController = require('./controllers/bukuController')

var app = express()
app.use(cookieSession({
    name: 'session',
    keys: ['username', 'email'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())
app.set('views', path.join(__dirname, '/views/'))
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'mainlayout',
    layoutDir: __dirname + '/views/layouts/'
}))

// app.engine('html', require('hbs').__express);
app.set('view engine', 'hbs')

app.listen(port, () => {
    console.log('Port berjalan di ' + port)
})

// Route URL
app.use('/admin', adminController);
app.use('/', userController);
app.use('/buku', bukuController);
