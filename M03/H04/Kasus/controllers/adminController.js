const express = require('express');
const mongoose = require('mongoose');
// var session = require('express-session');
var router = express.Router();
const Admin = mongoose.model('Admin');

const app = express();
// app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));

router.get('/', (req, res) => {
    res.render("admin/adminLogin", {
        viewTitle: "Admin Login"
    });
});

router.get('/register', (req, res) => {
    res.render("admin/adminRegister", {
        viewTitle: "Admin Register"
    });
});


router.post('/', (req, res) => {
    if (req.body.username == this.username )  {
        
        res.redirect("buku/list");
        // res.render("buku/list");
    } else {

        console.log('error nih')
    }
});

// router.get('/', (req, res) => {
//     res.render("admin/addOrEditAdmin", {
//         viewTitle: "Tambah Admin"
//     });
// });

router.post('/register', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var admin = new Admin();
    admin.username = req.body.username;
    admin.email = req.body.email;
    admin.password = req.body.password;
    admin.save((err, doc) => {
        if (!err) {
            // sess = req.session
            // if (sess.admin.email && sess.admin.password) 
                // res.render('admin/list', {
                //     greeting: "Selamat Datang" + sess.admin.username
                // })
            // else 
                res.redirect('/')
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("admin/addOrEditAdmin", {
                    viewTitle: "Insert Admin",
                    admin: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Admin.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('admin/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("admin/addOrEditAdmin", {
                    viewTitle: 'Update admin',
                    admin: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/admin/list', (req, res) => {
    Admin.find((err, docs) => {
        if (!err) {
            res.render("admin/list", {
                list: docs
            })

        }
        else {
            console.log('Error in retrieving admin list :' + err);
        }
    })
        .lean();
});


router.get('/:id', (req, res) => {
    Admin.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log(doc)
            res.render("admin/addOrEditAdmin", {
                viewTitle: "Update admin",
                admin: doc
            });
        }
    })
    .lean();
});

router.get('/delete/:id', (req, res) => {
    Admin.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/admin/list');
        }
        else { console.log('Error in admin delete :' + err); }
    });
});

router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/list');
    });

});

module.exports = router;