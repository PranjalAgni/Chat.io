const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  //My custom event
  socket.emit('newMessage', {
      from: 'admin',
      text:  'welcome to chat room',
      createdAt: new Date().getTime(),
  });

  socket.broadcast.emit('newMessage', {
      from: 'admin',
      text:  'new user  joined',
      createdAt: new Date().getTime(),
  });

  //Client to Server(Bidirectional)
    socket.on('createMessage', (newMessage) => {
      console.log('New message landed ', newMessage);

        io.emit('newMessage', {
            from: newMessage.from,
            to: newMessage.to,
            date: new Date().getTime(),
        });

    });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
