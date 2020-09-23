const operations = require('./operations.js')
const assert = require('assert');

// it('should return true', () => {
//     assert.equal(true, true);
// })


it('menghitung penjumlahan 1 dan 3', () => {
    // assert.equal(add(1, 3), 4)
    assert.equal(operations.tambah(1, 3), 4)
})

it('menghitung penjumlahan -1 dan -3', () => {
    // assert.equal(add(1, 3), 4)
    assert.equal(operations.tambah(-1, -3), -4)
})

it('menghitung pengurangan 50 dan 30', () => {
    // assert.equal(add(1, 3), 4)
    assert.equal(operations.kurang(50, 30), 20)
})

it('menghitung perkalian 11 dan 32', () => {
    // assert.equal(add(1, 3), 4)
    assert.equal(operations.kali(11, 32), 352)
})

it('menghitung penjumlahan 1 dan 3', () => {
    // assert.equal(add(1, 3), 4)
    assert.equal(operations.bagi(34, 2), 17)
})


it('test gagal kalau salah satunya bukan angka', () => {
    assert.equal(operations.validateNumbers('apa ya', 4), false)
})

it('test gagal kalau keduanya bukan angka', () => {
    assert.equal(operations.validateNumbers('apa ya', 'apa ya'), false)
})

it('testmya berhasil kalau keduanya adalah angka', () => {
    assert.equal(operations.validateNumbers(6, 2), true)
})

it('menghitung luas persegi panjang ', () => {
    assert.equal(operations.luasPersegiPanjang(34, 2), 68)
})

it('menghitung luas persegi panjang tidak sesuai ', () => {
    assert.equal(operations.luasPersegiPanjang(34, 9), 68) //SALAH
})

it('menghitung luas persegi panjang inputan tidak valid', () => {
    assert.equal(operations.luasPersegiPanjang(34, 0), "inputan tidak valid")
})

it('menghitung luas persegi panjang inputan huruf', () => {
    assert.equal(operations.luasPersegiPanjang("apa", "ya"), "inputan tidak boleh huruf")
})