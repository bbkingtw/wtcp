
// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/app.html');
});

var cp=require('child_process')
var exec=cp.exec;

io.on('connection', function(client) {  
    //console.log('Client connected...');

    client.on('cmd', function(cmd) {
			client.emit('message','>'+cmd)
			exec(cmd, function(err,stdout,stderr){
				client.emit('message',stdout);
			})
    });
});
server.listen(8989);  
