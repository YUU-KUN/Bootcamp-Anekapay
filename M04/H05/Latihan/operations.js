const tambah = (x, y) => +x + +y;
const kurang = (x, y) => +x - +y;
const kali = (x, y) => +x * +y;
const bagi = (x, y) => +x / +y;

const validateNumbers = (x, y) => {
    if (isNaN(x) || isNaN(y)) {
        return false
    }
    return true
}
const luasPersegiPanjang = (x, y) => {
    if (x == 0 || y == 0) {
        return "inputan tidak valid"
    } else if ( typeof(x) === 'string' || typeof(y) === 'string') {
        return "inputan tidak boleh huruf"
    }
    return x * y
}

module.exports = {
    tambah,
    kurang,
    kali,
    bagi,
    validateNumbers,
    luasPersegiPanjang
}