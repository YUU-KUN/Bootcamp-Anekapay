var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// io.on('connection', (socket) => {
//   console.log('A user connected');
// });
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }) // Emit event ke socket yang online

io.on('connection', (socket) => {
    io.emit('user baru', 'Ada user baru masuk nih~');
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
        io.emit('chat message', (msg))
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


http.listen(3000, () => {
    console.log('listening on http://localhost:3000');
})

