function playMusic() {
    console.log('Song is  being played....');
}

var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
});


socket.on('newMessage' , function (message) {
    console.log('New Message', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});


socket.emit('createMessage', {
    from: 'Flask',
    text: 'I am better than Django',
}, function (m) {
    console.log('Got it ', m);
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});


jQuery('#message-form').on('submit', function (e) {
   e.preventDefault();
   socket.emit("createMessage", {
       from: 'User',
       text: jQuery('[name = message]').val(),
   }, function (m) {

   })

});