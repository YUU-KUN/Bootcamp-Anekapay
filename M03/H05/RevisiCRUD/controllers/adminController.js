const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

router.get('/', (req, res) => {
    res.redirect('admin/login')
});

router.get('/login', (req, res) => {
    res.render("admin/adminLogin", {
        viewTitle: "Login Admin"
    });
});
router.get('/register', (req, res) => {
    res.render("admin/adminRegister", {
        viewTitle: "Register Admin"
    });
});

router.post('/login', (req, res) => {
    Admin.findOne({ email: req.body.email, password: req.body.password }, (err, admin) => {
        console.log(admin)
        if (!err) {
            if (admin) {
                // req.session.email = admin.email
                // req.session.password = admin.password
                res.redirect('/')
                // res.redirect('admin/adminHome')
            } else {
                res.redirect('adminHome')
                // res.status('500').send('Username atau Password Salah')
                //     message: 'Username atau Password Salah'
                // })
            }
        } else {
            console.log('Error saat login: ' + err)
            res.status('500').send('Datanya ada yang salah nih~')
            // res.status('500', {
            //     message: 'Ada kesalahan Data'
            // })
        }
    })
});

router.post('/register', (req, res) => {
    if (req.body._id == '')
        insertAdmin(req, res);
    else
        updateAdmin(req, res);
});

router.get('/adminHome', (req, res) => {
    res.render('admin/adminHome')
})

function insertAdmin(req, res) {
    var admin = new Admin();
    admin.username = req.body.username;
    admin.email = req.body.email;
    admin.password = req.body.password;
    admin.save((err, doc) => {
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



router.get('/list', (req, res) => {
    Admin.find((err, docs) => {
        if (!err) {
            res.render("admin/list", {
                list: docs
            })
        }
        else {
            console.log('Error in retrieving Admin list :' + err);
        }
    })
    .lean();
});


module.exports = router;