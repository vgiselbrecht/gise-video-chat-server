var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server, {cors:{origin: process.env.CORS_ORIGIN || '*',}});

server.listen(process.env.PORT || 8080);

io.on('connection', function (socket) {
    socket.on('login', function (data) {
        socket.join(data.room);
        socket.join(data.room + "-" + data.id);
    });
    socket.on('push', function (data) {
        if(data.receiver != 0){
            socket.to(data.room + "-" + data.receiver).emit('pull', data);
        }else{
            socket.to(data.room).emit('pull', data);
        }
    });
});