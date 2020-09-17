const express = require('express')
const mongoose = require('mongoose');
var router = express.Router()

const Buku = mongoose.model('Buku')
const User = mongoose.model('User')

router.get('/', function (req, res) {
    Buku.find((err, buku) => {
        console.log(buku)
        if (!err) {
            res.render("user/userHome", {
                list: buku
            })
        }
        else {
            console.log('Error in retrieving Buku list :' + err);
        }
    })
        .lean();
})
// WITH SESSION
// router.get('/', function (req, res) {
//     if (req.session.username && req.session.email) {
//         res.redirect('/home')
//     } else {
//         res.render('userLogin')
//     }
// })

router.get('/user/list', (req, res) => {
    User.find({userLevel: "User"}, (err, user) => {
        console.log(user)
        if (!err) {
            res.render("user/list", {
                list: user
            })
        }
        else {
            console.log('Error in retrieving user list :' + err);
        }
    })
    .lean();
});

router.get('/userLogin', function (req, res) {
    res.render('user/userLogin');
    console.log('Mohon login terlebih dahulu!')
})
// // WITH SESSION
// router.get('/', function (req, res) {
//     if (req.session.email) {
//         res.render('userHome', {
//             username: req.session.username,
//             email: req.session.email
//         })
//     } else {
//         res.redirect('/');
//         console.log('Mohon login terlebih dahulu!')
//     }
// })

router.get('/userRegister', function (req, res) {
    res.render('user/userRegister')
})

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

router.post('/userLogin', function (req, res) {
    User.findOne({ email: req.body.email, password: req.body.password, userLevel: "User" }, function (err, user) {
        if (!err) {
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



router.get('/logout', function (req, res) {
    req.session = null
    res.redirect('/')
})

module.exports = router