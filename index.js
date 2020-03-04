var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');

   // Send a message after a timeout of 4 seconds defalult events
    // setTimeout(function() {
    // socket.send('Sent a message 4seconds after connection!');
    // }, 4000);


  //Send a message to client when custom events 
//    setTimeout(function() {
//       //Sending an object when emmiting an event
//       socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
//    }, 4000);

io.on('connection', function(socket) {
    socket.on('clientEvent', function(data) {
       console.log(data);
    });
 });
 
 
   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});

http.listen(3000, function() {
   console.log('listening on *:3000');
});