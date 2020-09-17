const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Buku = mongoose.model('Buku');

router.get('/', (req, res) => {
    res.render("buku/addOrEdit", {
        viewTitle: "Insert Buku"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var buku = new Buku();
    buku.nama = req.body.nama;
    buku.author = req.body.author;
    buku.penerbit = req.body.penerbit;
    buku.tahunTerbit = req.body.tahunTerbit;
    buku.jumlahHalaman = req.body.jumlahHalaman;
    buku.save((err, doc) => {
        if (!err)
            res.redirect('buku/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("buku/addOrEdit", {
                    viewTitle: "Insert Buku",
                    buku: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Buku.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('buku/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("buku/addOrEdit", {
                    viewTitle: 'Update Buku',
                    buku: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Buku.find((err, docs) => {
        if (!err) {
            res.render("buku/list", {
                list: docs
            })
        }
        else {
            console.log('Error in retrieving buku list :' + err);
        }
    })
    .lean();
});

// UPDATE
router.get('/:id', (req, res) => {
    Buku.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log(doc)
            res.render("buku/addOrEdit", {
                viewTitle: "Update Buku",
                buku: doc
            });
        }
    })
    .lean();
});

// DELETE 
router.get('/delete/:id', (req, res) => {
    Buku.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/buku/list');``
        }
        else { console.log('Error in Buku delete :' + err); }
    });
});

module.exports = router;