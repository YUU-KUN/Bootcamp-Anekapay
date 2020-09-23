require('../models/db')
const mongoose = require('mongoose');
const User = mongoose.model('User')
const assert = require('assert');
// const admin = require('../controllers/adminController')
var chai = require('chai'),
    request = require('supertest');

var expect = chai.expect;

// request = supertest();   

const app = require('../server').app

describe('CRUD E-Commerse Testing', function () {
    describe('#POST / Buku', function () {
        it('insert data buku', function (done) {
            request(app).post('/').end(function (err, req, res) {
                expect(req.session = true)
                expect(req.status = 200)
                done();
            });
        });

        it('menampilkan semua data admin', function (done) {
            request(app).get('/admin/list').end(function (err, req, res) {
                expect(req.session = true)
                expect(req.status = 200)
                done();
            });
        });
    });
});