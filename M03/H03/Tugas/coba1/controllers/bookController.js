const express = require('express')
const mongoose = require('mongoose');
var router = express.Router();
const Book = mongoose.model('Book');

router.get('/', (req, res) => {
    res.render("addOrEdit", {
        viewTitle: "Insert Book Data"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertData(req, res);
    else
        updateData(req, res);
});

function insertData(req, res) {
    var book = new Book();
    book.name = req.body.name;
    book.author = req.body.author;
    book.penerbit = req.body.penerbit;
    book.tahunTerbit = req.body.tahunTerbit;
    book.jumlahHalaman = req.body.jumlahHalaman;
    book.save((err, books) => {
        if (!err)
            res.redirect('book/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("addOrEdit", {
                    viewTitle: "Insert Book Data",
                    book: req.body
                });
            }
            else
                console.log('Error ketika memasukkan Data : ' + err);
        }
    });
}

function updateData(req, res) {
    Book.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, books) => {
        if (!err) { res.redirect('list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("addOrEdit", {
                    viewTitle: 'Update Buku',
                    book: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Book.find((err, books) => {
        if (!err) {
            res.render("list", {
                list: books
            });
        }
        else {
            console.log('Gagal menampilkan Data Buku  :' + err);
        }
    });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'nama':
                body['namaError'] = err.errors[field].message;
                break;
            case 'author':
                body['authorError'] = err.errors[field].message;
                break;
            case 'penerbit':
                body['penerbitError'] = err.errors[field].message;
                break;
            case 'tahunTerbit':
                body['tahunTerbitError'] = err.errors[field].message;
                break;
            case 'jumlahHalaman':
                body['jumlahHalamanError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Book.findById(req.params.id, (err, books) => {
        if (!err) {
            res.render("addOrEdit", {
                viewTitle: "Update Book Data",
                book: books
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id, (err, books) => {
        if (!err) {
            res.redirect('/list/ ');
        }
        else { console.log('Gagal menghapus Data Buku :' + err); }
    });
});

module.exports = router;