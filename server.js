var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req,res) {

	console.log("A get request at home page");


});

io.on('connection', function(socket) {

	console.log("A user has connected");

	socket.on('disconnect', function() {

		console.log("A user has disconnected");
	});

	socket.on('username', function(username) {

	    socket.username = username;
	    console.log("A new person with the name " +username + "Has Joined");
    });

	socket.on('message', function(data) {

	    socket.broadcast.emit('message', function (username) {

	        username: socket.username;
	        message: data;

        });
    })




});

http.listen(port, function () {

    console.log("Server running at %d",port);

});

