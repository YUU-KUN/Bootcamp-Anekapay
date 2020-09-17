const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()

const Buku = mongoose.model('Buku')
const User = mongoose.model('User')
// const aksiUser = `<a class='btn btn-secondary' href='/userLogin'><i class='fa fa-plus'></i> Login</a> <a class='btn btn-secondary' href='/userRegister'><i class='fa fa-plus'></i> Register</a>`

router.get('/', (req, res) => {
    Buku.find((err, docs) => {
        if (!err) {
            res.render("user/userHome", {
                list: docs,
            })
        }
        else {
            console.log('Error in retrieving buku list :' + err);
        }
    })
    .lean();
});

router.get('/user/list', (req, res) => {
    User.find({userLevel: "User"}, (err, user) => {
        if (!err) {
            res.render("user/list", {
                list: user
            })
        }
        else {
            console.log('Error in retrieving User list :' + err);
        }
    })
    .lean();
});


module.exports = router