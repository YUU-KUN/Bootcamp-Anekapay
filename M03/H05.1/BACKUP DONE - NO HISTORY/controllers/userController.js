const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()

const Buku = mongoose.model('Buku')
const User = mongoose.model('User')
const Keranjang = mongoose.model('Keranjang')
const DetailKeranjang = mongoose.model('DetailKeranjang')
// const aksiUser = `<a class='btn btn-secondary' href='/userLogin'><i class='fa fa-plus'></i> Login</a> <a class='btn btn-secondary' href='/userRegister'><i class='fa fa-plus'></i> Register</a>`

// USER HOME
router.get('/', (req, res) => {
    Buku.find((err, docs) => {
        if (!err) {
            if (req.session.email) {
                res.render("user/userHome", {
                    list: docs,
                    greeting: `Selamat Datang, ${req.session.username}!`,
                    logout: "Logout",
                    keranjang: "Keranjang",
                    profile: "Profile"
                    // email: email + req.session.email,
                    // greeting: "Selamat Datang, " + req.session.username
                })
            } else if (!req.session.email) {
                email = ""
                res.render("user/userHome", {
                    list: docs,
                    login: "Login",
                    title: "Buku List",
                    // logout: "",
                    // greeting: '',
                });
            }
        } else {
            console.log('Error in retrieving buku list :' + err);
        }
    })
        .lean();
});

// LIST USER
router.get('/user/list', (req, res) => {
    User.find({ userLevel: "User" }, (err, user) => {
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

router.get('/addToCart/:id', (req, res) => {
    Buku.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log(doc)
            res.render("user/confirmAddToCart", {
                viewTitle: "Form Konfirmasi",
                buku: doc 
            });
        }
    })
    .lean();
});

// CART

router.get('/keranjang', (req, res) => {
    if (!req.session.cart) {
        res.render('error/keranjangKosong')
        // res.send('Keranjang Kosong') //sementara
    } else {
        var harga1 = 0
        var harga2 = 0
        for (let i = 0; i < req.session.cart.length; i++) {
            var harga = req.session.cart[i].harga
            var jumlah = req.session.cart[i].jumlah
            harga1 = harga * jumlah
            harga2 = harga2 + harga1
        }
        res.render('user/keranjang', {
            keranjang: req.session.cart,
            greeting: req.session.username,
            total: harga2
        })
        console.log(req.session.cart)
    }
})

// router.get('/buku/addToCart/:id', (req, res) => {
//     res.send('INI TAMBAH CART')
// })

// router.get('/buku/addToCart/:id', function (req, res) {
//     var productId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart : {});
//     var product = products.filter(function (item) {
//         return item.id == productId;
//     });
//     cart.add(product[0], productId);
//     req.session.cart = cart;
//     res.redirect('/');
// });

// router.get('/keranjang', function (req, res) {
//     if (!req.session.cart) {
//         return res.render('user/keranjang', {
//             list: null
//         });
//     }
//     var cart = new Keranjang(req.session.cart);
//     res.render('user/keranjang', {
//         products: cart.getItems(),
//         totalPrice: cart.totalPrice
//     });
// });

// TAMBAH KE KERANJANG
router.post('/tambah', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = []
    }
    req.session.cart.push({
        // username: req.session.username,
        id_buku: req.body._id,
        nama: req.body.nama,
        harga: req.body.harga,
        jumlah: req.body.jumlah,
        subtotal: req.body.harga * req.body.jumlah,
    })
    console.log(req.session.cart)
    console.log(req.body)
    res.redirect('/keranjang')
})

// EDIT KERANJANG
// GET data keranjang berdasarkan untuk diubah
router.get('/editKeranjang/:id', (req, res) => {
    var c = req.session.cart.filter((cart) => {
        return cart.id_buku == req.params.id
    })
    res.render('user/editKeranjang', {
        viewTitle: "Edit Keranjang",
        d: c
    })
    console.log("ini params");
    console.log(req.params.id);
    console.log("ini c");
    console.log(c);
    // console.log("ini buku");
    // console.log(buku);
})

router.get('/editKeranjang', (req, res) => {
    var c = req.session.cart.filter((cart) => {
        return cart.buku == req.params.id
    })
    res.render('user/langsunghapus', {
        viewTitle: "langsunghapus",
        d: c
    })
    console.log("ini params");
    console.log(req.params.id);
    console.log('ini session cart');
    console.log(req.session.cart);
    console.log("INI C")
    console.log(c)
})
//POST data perubahan
router.post('/editKeranjang', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = []
    }

    var id = req.body.id_buku
    var ubah = req.session.cart.reduce((acc, c) => {
        if (c.id_buku !== id) {
            acc.push(c)
        }
        return acc
    }, [])
    req.session.cart = ubah

    req.session.cart.push({
        // username: req.session.username,
        id_buku: req.body.id_buku,
        nama: req.body.nama,
        harga: req.body.harga,
        jumlah: req.body.jumlah,
        subtotal: req.body.harga * req.body.jumlah,
    })
    res.redirect('/keranjang')
})


// CHECKOUT
router.get('/checkout', (req, res) => {
    var harga1 = 0
    var harga2 = 0
    const id_keranjang = Math.random()
    for (let i = 0; i < req.session.cart.length; i++) {
        const detail = new DetailKeranjang()
        detail.id_keranjang = id_keranjang
        detail.nama = req.session.cart[i].nama
        detail.harga = req.session.cart[i].harga
        detail.jumlah = req.session.cart[i].jumlah
        detail.subtotal = req.session.cart[i].subtotal
        detail.save()

        var harga = req.session.cart[i].harga
        var jumlah = req.session.cart[i].jumlah
        harga1 = harga * jumlah
        harga2 = harga2 + harga1
    }
    var keranjang = new Keranjang()
    keranjang.id_keranjang = id_keranjang
    keranjang.pembeli = req.session.username
    keranjang.total = harga2
    keranjang.tanggal = Date.now()  
    keranjang.save()

    req.session.cart = []
    res.redirect('/')
})

//HAPUS KERANJANG
router.get('/keranjang/hapus/:id',(req, res) => {
    if (!req.session.cart) {
        req.session.cart = []
    } 
    var id = req.params.id
    var cart = req.session.cart.reduce((acc,c) => {
        if (c.id_buku !== id) {
            acc.push(c)
        }
        return acc
    }, [])
    req.session.cart = cart
    res.redirect('/keranjang')
})

// USER PROFILE
router.get('/profile', (req, res) => {
    if (req.session.email) {
        res.render("user/userProfile", {
        username: req.session.username,
        email: req.session.email,
        level: "User",
        viewTitle: `${req.session.username}'s Profile`,
        // email: email + req.session.email,
        // greeting: "Selamat Datang, " + req.session.username
    })
    } else {
        res.redirect('/')
        console.log('Mohon Login Terlebih Dahulu!')
    }
    // console.log(req.session.username)
    // console.log(req.session.email)
    // console.log(req.session.userLevel)
    // console.log(req.session);
})


//ERROR
// router.get('/keranjangKosong', (req, res) => {
//     res.render('error/keranjangKosong')
// })

module.exports = router