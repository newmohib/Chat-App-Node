var http = require('http');
var fs = require('fs');

// Loading the file index.html displayed to the client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Loading socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket, username) {
   
    
    
    // The other clients are told that someone new has arrived
    socket.broadcast.emit('message', 'Another client has just connected!');

    // As soon as the username is received, it's stored as a session variable
    socket.on('little_newbie', function(username) {
        console.log("usrname:",username);
         // When the client connects, they are sent a message
        socket.emit('message', 'You are connected! '+username);
        socket.username = username;
    });

    // When a "message" is received (click on the button), it's logged in the console
    socket.on('message', function (message) {
        // The username of the person who clicked is retrieved from the session variables
        console.log(socket.username + ' is speaking to me! They\'re saying: ' + message);
        socket.broadcast.emit('message', socket.username +' '+ message);
    }); 
});


server.listen(3000);