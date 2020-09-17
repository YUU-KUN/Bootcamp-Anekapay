require('./models/db')

const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')
var cookieSession = require('cookie-session')

const bukuController = require('./controllers/bukuController')
const loginController = require('./controllers/loginController')
const userController = require('./controllers/userController')
const adminController = require('./controllers/adminController')

var app = express()

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())
app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', exphbs({
    extname:'hbs',
    defaultLayout: 'mainlayout',
    layoutsDir: __dirname + '/views/layouts/'
}))

app.set('view engine', 'hbs')

app.listen(3000, ()=>{
    console.log('Server berjalan di http://localhost:3000 nih~')
})

// ROUTER URL
// app.use('/', userController)
// app.use('/admin', adminController)
app.use('/buku', bukuController)
app.use('/', loginController)
app.use('/', userController)
app.use('/', adminController)


