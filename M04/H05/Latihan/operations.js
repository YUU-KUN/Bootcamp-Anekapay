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

 module.exports = {
     tambah,
     kurang,
     kali,
     bagi,
     validateNumbers
    }