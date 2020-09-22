const operations = require('./operations')
const readline = require('readline')

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log(`
Calc.js

Welcome to the Node.js Calculator app! 
Version: 1.0.0.

Usage: The user will be prompted for two numbers, 
then asked to select their operation of choice.
`)

r1.question('Masukkan angka pertama:', (x) => {
    r1.question('Masukkan angka kedua:', (y) => {
        r1.question(
            `
        Pilih operasi yang tersedia: 
        
        [1] Penjumlahan (+)
        [2] Pengurangan (-)
        [3] Perkalian (*)
        [4] Pembagian (/)

        Masukkan pilihan Anda: `,
            (pilihan) => {
                if (!operations.validateNumbers(x, y)) {
                    console.log('Only numbers are allowed! Please restart the program.')
                  } else {
                    switch (pilihan) {
                      case '1':
                        console.log(`Hasil penjumlahan dari ${x} dan ${y} adalah ${operations.tambah(x, y)}.`)
                        break
                      case '2':
                        console.log(
                          `Hasil pengurangan dari ${x} dan ${y} adalah ${operations.kurang(x, y)}.`
                        )
                        break
                      case '3':
                        console.log(
                          `Hasil perkalian dari ${x} dan ${y} adalah ${operations.kali(x, y)}.`
                        )
                        break
                      case '4':
                        console.log(
                          `Hasil pembagian dari ${x} dan ${y} adalah ${operations.bagi(x, y)}.`
                        )
                        break
                      default:
                        console.log(
                          'Mohon mulai ulang aplikasi dan pilih operasi yang tersedia.'
                        )
                        break
                    }
                  }
                r1.close()
            }
        )
    })
})