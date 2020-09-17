const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Buku = mongoose.model('Buku');

router.get('/', (req, res) => {
    Buku.find((err, docs) => {
        if (!err) {
            res.render("user/userHome", {
                list: docs
            })
        }
        else {
            console.log('Error in retrieving buku list :' + err);
        }
    }).lean();
});

router.get('/login', (req, res) => {
    res.render("user/userLogin", {
        viewTitle: "Login User"
    });
});
router.get('/register', (req, res) => {
    res.render("user/userRegister", {
        viewTitle: "Register User"
    });
});


router.post('/register', (req, res) => {
    if (req.body._id == '')
        insertUser(req, res);
    else
        updateAdmin(req, res);
});

router.get('/', (req, res) => {
    res.render('user/userHome')
})

function insertUser(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.redirect('/login');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("error");
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

// router.post('/login', (req, res) => {
//     console.log(req.body)
//     User.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
//         console.log(user)
//         if (!err) {
//             if (user) {
//                 req.session.email = user.email;
//                 req.session.password = user.password;
//                 // req.session.email = 
//                 console.log('harusnya berhasil')
//                 res.redirect('/')
//             } else {
//                 console.log('Username atau Password Salah / Tidak Terdaftar')
//             }
//             // addToCart: "<a href='/buku/addToCart/{{this._id}}'onclick='return confirm('Ingin menambahkan buku ini ke Keranjang ?');'><i class='fa fa-cart fa-lg' aria-hidden='true'></i></a>"
//             // if (user) {
//             // } else {
//             //     res.status('500')
//             //     .send('Username atau Password Salah / Tidak Terdaftar', 
//             //     )
//             //     //     message: 'Username atau Password Salah'
//             //     // })
//             // }
//         } else {
//             console.log('Terjadi kesalahan saat login: ' + err)
//             res.status('500').send('Ada kesalahan Data')
//             // res.status('500', {
//             //     message: 'Ada kesalahan Data'
//             // })
//         }
//     })
// });

router.post('/login', function (req, res) {
    User.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        console.log(user)
        if (!err) {
            if (user) {
                // console.log(user)
                // console.log(user.username)
                // req.session.username = user.username
                // req.session.email = req.body.email
                res.redirect('/')
                console.log('Berhasil Login. Selamat Datang ')
                // console.log('Berhasil Login')
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

router.get('/user/list', (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.render("user/list", {
                list: docs
            })
        }
        else {
            console.log('Error in retrieving User list :' + err);
        }
    })
        .lean();
});


module.exports = router;