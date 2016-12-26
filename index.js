var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io  = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req,res) {
	
	console.log("A request for the index page");

});


var numUsers = 0;

io.on('connection', function(socket) {

	var userAdded = false;

	socket.on('message', function(data) {

		socket.broadcast.emit('message', function(username) {

			username: socket.username;
			message: data;
		});




		})


	socket.on('add user', function(username) {

		if(userAdded) {

			++numUsers;
			socket.username = username;
			userAdded = true;
			socket.emit('login', function() {

					numUsers: numUsers

			});

			socket.emit('user joined', function() {

				username: socket.username
				numUsers: numUsers

			});
		}


		socket.on('typing', function() {

			socket.broadcast.emit('typing', function() {

				username = socket.username
			});
		});

		socket.on('stop typing', function() {

			socket.broadcast.emit('stop typing', function() {

				username = socket.username
			});
		});

		socket.on('disconnect', function() {

			if(userAdded) {
				--numUsers;

				socket.broadcast.emit('user left', function() {

					username = socket.username
					numUsers = numUsers



				});
			}
		});
	});




	

});



http.listen(port, function() {

	console.log("Server runnin at %d" , port);
});