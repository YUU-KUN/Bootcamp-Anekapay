const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
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


// function handleValidationError(err, body) {
//     for (field in err.errors) {
//         switch (err.errors[field].path) {
//             case 'nama':
//                 body['namaError'] = err.errors[field].message;
//                 break;
//             case 'author':
//                 body['authorError'] = err.errors[field].message;
//                 break;
//             default:
//                 break;
//         }
//     }
// }

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

router.get('/delete/:id', (req, res) => {
    Buku.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/buku/list');
        }
        else { console.log('Error in Buku delete :' + err); }
    });
});

module.exports = router;