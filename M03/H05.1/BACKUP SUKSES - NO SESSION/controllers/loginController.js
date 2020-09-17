const express = require('express');
const mongoose = require('mongoose');
var router = express.Router()
const User = mongoose.model('User')

router.get('/userLogin', (req, res) => {
    res.render('user/userLogin')
})
router.get('/userRegister', (req, res) => {
    res.render('user/userRegister')
})
router.get('/admin/adminRegister', (req, res) => {
    res.render('admin/adminRegister',{
        viewTitle: "Admin Register"
    })
})
router.get('/admin/adminLogin', (req, res) => {
    res.render('admin/adminLogin',{
        viewTitle: "Admin"
    })
})
router.get('/admin', (req, res) => {
    res.render('admin/adminHome')
})


// ADMIN LOGIN
router.post('/admin/adminLogin', function (req, res) {
    User.find({email: req.body.email, password: req.body.password, userLevel: "Admin"}, function (err, admin) {
        if (!err) {
            console.log(admin)
            if (admin) {
                // console.log(user)
                // console.log(user.username)
                // req.session.username = user.username
                // req.session.email = req.body.email
                res.redirect('/admin')
                console.log('Berhasil Login. Selamat Datang ')
            } else {
                console.log('admin belum terdaftar')
                res.status('500').send('admin belum terdaftar')
            }
        } else {
            console.log('Terdapat kesalahan pada data')
            res.status('500').send('Kesalahan pada Data')
        }
    })
})

// ADMIN REGISTER
router.post('/admin/adminRegister', function (req, res) {
    if (req.body._id == '') {
        tambahAdmin(req, res)
    } else {
        // res.redirect('/')
        console.log('Error registering admin')
    }
})
function tambahAdmin(req, res) {
    var admin = new User()
    admin.username = req.body.username
    admin.email = req.body.email
    admin.password = req.body.password
    admin.userLevel = "Admin"
    admin.save((err) => {
        if (!err) {
            res.redirect('/admin/adminLogin')
        } else {
            res.send('Error registering admin')
            console.log('Error registering admin')
        }
    })
}


// USER LOGIN
router.post('/userLogin', function (req, res) {
    User.findOne({ email: req.body.email, password: req.body.password, userLevel: "User" }, function (err, user) {
        if (!err) {
            console.log(user)
            if (user) {
                // console.log(user)
                // console.log(user.username)
                // req.session.username = user.username
                // req.session.email = req.body.email
                res.redirect('/')
                console.log('Berhasil Login. Selamat Datang ')
            } else {
                console.log('User belum terdaftar')
                res.status('500').send('User belum terdaftar')
            }
        } else {
            console.log('Terdapat kesalahan pada data')
            res.status('500').send('Kesalahan pada Data')
        }
    })
})

// USER REGISTER
router.post('/userRegister', function (req, res) {
    if (req.body._id == '') {
        tambahUser(req, res)
    } else {
        // res.redirect('/')
        console.log('Error registering user')
    }
})
function tambahUser(req, res) {
    var user = new User()
    user.username = req.body.username
    user.email = req.body.email
    user.password = req.body.password
    user.userLevel = "User"
    user.save((err) => {
        if (!err) {
            res.redirect('/userLogin')
        } else {
            res.send('Error registering user')
            console.log('Error registering user')
            // console.log('Error registering user');
        }
    })
}

module.exports = router