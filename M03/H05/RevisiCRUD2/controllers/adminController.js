const express = require('express')
const mongoose = require('mongoose');
var router = express.Router()

const User = mongoose.model('User')

router.get('/', function (req, res) {
    res.redirect('admin/adminLogin')
    // cek.u kalo punya session,
    // res.render('admin/adminHome')
    // kalo gak ada, 
    // arahin ke login dulu
})
// WITH SESSION
// router.get('/', function (req, res) {
//     if (req.session.username && req.session.email) {
//         res.redirect('/home')
//     } else {
//         res.render('userLogin')
//     }
// })

router.get('/list', (req, res) => {
    User.find({ userLevel: "Admin" }, (err, admin) => {
        console.log(admin)
        if (!err) {
            res.render("admin/list", {
                list: admin
            })
        }
        else {
            console.log('Error in retrieving admin list :' + err);
        }
    })
        .lean();
});



router.get('/adminLogin', function (req, res) {
    res.render('admin/adminLogin', {
        viewTitle: 'Admin Login'
    });
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

router.get('/adminRegister', function (req, res) {
    res.render('admin/adminRegister')
})

router.post('/adminRegister', function (req, res) {
    if (req.body._id == '') {
        tambahAdmin(req, res)
    } else {
        res.redirect('/adminRegister')
        console.log('Error registering Admin')
        // console.log('Error registering user');
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
            res.redirect('/adminLogin')
        } else {
            res.send('Error registering user')
            console.log('Error registering user')
            // console.log('Error registering user');
        }
    })
}

// router.post('/adminLogin', function (req, res) {
//     User.findOne({ email: req.body.email, password: req.body.password, userLevel: "Admin" }, function (err, admin) {
//         if (!err) {
//             console.log(admin)
//             if (admin) {
//                 // console.log(user)
//                 // console.log(user.username)
//                 // req.session.username = user.username
//                 // req.session.email = req.body.email
//                 res.redirect('/adminHome')
//                 console.log('Berhasil Login. Selamat Datang, Admin ')
//             } else {
//                 console.log('Admin belum terdaftar')
//                 res.status('500').send('Admin belum terdaftar')
//             }
//         } else {
//             console.log('Terdapat kesalahan pada data')
//             res.status('500').send('Kesalahan pada Data')
//         }
//     })
// })

router.post('/adminLogin', function (req, res) {
    User.findOne({ email: req.body.email, password: req.body.passwor }, function (err, req) {
        if (!err) {
            console.log(req)
            if (req) {
                // console.log(user)
                // console.log(user.username)
                res.redirect('/home')
                console.log('Berhasil Login. Selamat Datang ' + req.body.email)
            } else {
                console.log('Admin belum terdaftar')
                res.status('500').send('Admin belum terdaftar')
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