const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => { //route root URL
    res.send("Hello World")
})

app.listen(port, () => {
    console.log('server berjalan di http://localhost:'+port);
})