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
  socket.emit('newMessage' ,{
      from: 'lenovo@yoga360.com',
      text: 'Hello Dear User',
      createdAt: '10:58',
  });

  //Client to Server(Bidirectional)
    socket.on('createMessage', (newMessage) => {
      console.log('New message landed ', newMessage);
      io.emit('newMessage', {
          from: newMessage.from,
          to: newMessage.to,
          date: new Date().getDate(),
      });
    });
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
