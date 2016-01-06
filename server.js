var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

var port = 1234;

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'client', 'views'));

app.use(express.static('client'));

app.get('/', function(req,res){
	res.render('index');
});

var users = [];

io.on('connection', function(socket) {
var username = "";

      socket.on('add-user', function(data){
        if(users.indexOf(data.username) == -1){
          io.emit('add-user', {
            username: data.username
          });

          username = data.username;
          console.log( username + " has Connected!");
          users.push(data.username);

        } else {
          socket.emit('already-exist', {
            message: 'User Already Exists'
          })
        }
        
      })

      socket.on('request-users', function(){
        socket.emit('users', {users: users});
      });
      
      socket.on('message', function(data){
        io.emit('message', {username: username, message: data.message});
      })
           
      
      socket.on('disconnect', function(){      
        console.log(username + ' has disconnected!');
        users.splice(users.indexOf(username), 1);
        io.emit('remove-user', {username: username});
        
      })

});

http.listen(port, function(){
	console.log("This AWESOME server is now running on port: " + port);
})


