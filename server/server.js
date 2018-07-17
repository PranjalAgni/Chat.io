const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage , generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  //My custom event
  socket.emit('newMessage', generateMessage('admin', 'welcome to chat room'));

  socket.broadcast.emit('newMessage', generateMessage('admin', 'new user  joined'));

  //Client to Server(Bidirectional)
    socket.on('createMessage', (newMessage, callback) => {
      console.log('Create Message', newMessage);

        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        callback('this is from server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
    });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
