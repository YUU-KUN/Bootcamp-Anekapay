require('./db')

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser')
const port = 3000

const adminController = require('./controllers/adminController')
const userController = require('./controllers/userController')
const bukuController = require('./controllers/bukuController')

var app = express()
app.use(bodyparser.urlencoded({
    extended: true  
}))

app.use(bodyparser.json())
app.set('views', path.join(__dirname, '/views/'))
app.engine('hbs', exphbs({
    extname: 'hbs', 
    defaultLayout: 'mainlayout', 
    layoutDir: __dirname + '/viewa/layouts/'
}))

// app.engine('html', require('hbs').__express);
app.set('view engine', 'hbs')

app.listen(port, ()=>{
    console.log('Port berjalan di '+port)
})

// Route URL
app.use('/admin', adminController);
app.use('/user', userController);
app.use('/buku', bukuController);