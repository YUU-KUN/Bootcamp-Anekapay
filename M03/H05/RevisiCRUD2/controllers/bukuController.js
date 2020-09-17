const express = require('express')
const mongoose = require('mongoose');
var router = express.Router()

const Buku = mongoose.model('Buku')

router.get('/', function (req, res) {
    res.render('buku/addOrEdit')
})

// router.get('/list', function (req, res) {
//     res.render('buku/list')
// })

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertBuku(req, res);
    else
        updateBuku(req, res);
});

function insertBuku(req, res) {
    var buku = new Buku();
    buku.nama = req.body.nama;
    buku.author = req.body.author;
    buku.penerbit = req.body.penerbit;
    buku.tahunTerbit = req.body.tahunTerbit;
    buku.jumlahHalaman = req.body.jumlahHalaman;
    buku.save((err, buku) => {
        if (!err) {
            res.redirect('buku/list');
            console.log('Sukses menambahkan Buku')
        } else {
            res.send('Gagal menambahkan Buku')
            console.log('Gagal menambahkan Buku')

            // if (err.name == 'ValidationError') {
            //     handleValidationError(err, req.body);
            //     res.render("buku/addOrEdit", {
            //         viewTitle: "Insert Buku",
            //         buku: req.body
            //     });
            // }
            // else
            //     console.log('Error during record insertion : ' + err);
        }
    });
}

function updateBuku(req, res) {
    Buku.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, buku) => {
        if (!err) {
            res.redirect('buku/list'); }
        else {
            console.log('GAGAL UPDATE BUKU')
            console.log(err)
            // if (err.name == 'ValidationError') {
            //     handleValidationError(err, req.body);
            //     res.render("buku/addOrEdit", {
            //         viewTitle: 'Update Buku',
            //         buku: req.body
            //     });
            // }
            // else
            //     console.log('Error during record update : ' + err);
        }
    });
}

router.get('/:id', (req, res) => {
    Buku.findById(req.params.id, (err, buku) => {
        if (!err) {
            console.log(buku)
            res.render("buku/addOrEdit", {
                viewTitle: "Update Buku",
                list: buku
            });
        }
    })
        .lean();
});


router.get('/list', function (req, res) {
    Buku.find((err, buku) => {
        console.log(buku)
        if (!err) {
            res.render("buku/list", {
                list: buku
            })
        }
        else {
            console.log('Error in retrieving Buku list :' + err);
        }
    })
        .lean();
})


module.exports = router