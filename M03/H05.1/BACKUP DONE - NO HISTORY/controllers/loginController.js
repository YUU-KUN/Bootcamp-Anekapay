const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const User = mongoose.model('User')

// ADMIN
router.get('/admin/adminRegister', (req, res) => {
    res.render('admin/adminRegister', {
        viewTitle: "Admin Register"
    })
})
router.get('/admin/adminLogin', (req, res) => {
    res.render('admin/adminLogin', {
        viewTitle: "Admin"
    })
})
router.get('/admin', (req, res) => {
    if (req.session.username) {
        res.render('admin/adminHome',{
            username: req.session.username
        })
    } else {
        res.redirect('/admin/adminLogin')
    }
})

// USER
router.get('/userLogin', (req, res) => {
    res.render('user/userLogin')
})
router.get('/userRegister', (req, res) => {
    res.render('user/userRegister')
})

// ADMIN LOGIN
router.post('/admin/adminLogin', function (req, res) {
    User.findOne({ email: req.body.email, password: req.body.password, userLevel: "Admin"}, function (err, admin) {
        if (!err) {
            console.log(admin)
            if (admin) {
                console.log(admin)
                req.session.username = admin.username
                console.log(req.session.username)
                req.session.email = admin.email
                console.log(req.session.email)
                res.redirect('/admin')
                console.log('Berhasil Login. Selamat Datang ' + req.session.email)
                // console.log(req.session.username)
            } else {
                console.log('Admin belum terdaftar')
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
// ADMIN LOGOUT
router.get('/admin/logout', (req, res) => {
    if (req.session) {
        req.session = null 
        res.redirect('/admin');
        console.log('Admin Berhasil Logout')
    } else {
        res.render('admin/adminHome');
        console.log('Error Logout')
    }
})



// USER LOGIN
router.post('/userLogin', function (req, res) {
    User.findOne({ email: req.body.email, password: req.body.password, userLevel: "User" }, function (err, user) {
        if (!err) {
            console.log(user)
            if (user) {
                // console.log(user)
                // console.log(user.username)
                req.session.email = user.email
                req.session.username = user.username
                res.redirect('/')
                console.log('Berhasil Login. Selamat Datang ' + user.username)
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

// USER LOGOUT
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session = null
        res.redirect('/');
        console.log('User Berhasil Logout')
    } else {
        res.redirect('/')
        console.log('Error Logout')
    }
});

module.exports = router