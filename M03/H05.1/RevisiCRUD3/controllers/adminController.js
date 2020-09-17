const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()

const User = mongoose.model('User')

router.get('/admin/list', (req, res) => {
    User.find({userLevel: "Admin"}, (err, admin) => {
        if (!err) {
            res.render("admin/list", {
                list: admin
            })
        }
        else {
            console.log('Error in retrieving Admin list :' + err);
        }
    })
    .lean();
});


module.exports = router;