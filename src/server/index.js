const app = require('http').createServer();
const io = module.exports.io = require('socket.io')(app);
const SocketManager = require('./SocketManager');

const port = process.env.PORT || 5000;

io.on('connection', SocketManager);

app.listen(port, () => {
    console.log('server listening on port: ' + port);
});
