var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

var clients = 0;
io.on('connection', function(socket) {
   clients++;
   console.log("clients 1 :",clients);
   io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   
   socket.on('disconnect', function () {
      clients--;
      io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   });
});

http.listen(3000, function() {
   console.log('listening on *:3000');
});