
var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
});


socket.on('newLocationMessage', function (message) {
    const  li = jQuery('<li></li>');
    const a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

socket.on('newMessage' , function (message) {
    console.log('New Message', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});




socket.on('disconnect', function(){
    console.log('Disconnected from server');
});


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    const messageTextBox = jQuery('[name = message]');
    socket.emit("createMessage", {
        from: 'User',
        text: messageTextBox.val(),
    }, function () {
        messageTextBox.val('');
    });

});

const locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if ('geolocation' in navigator) {

        locationButton.attr('disabled', 'disabled').text('Sending location...');
        navigator.geolocation.getCurrentPosition(function (position) {
            locationButton.removeAttr('disabled').text('Send location');
            console.log(position);
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function (e) {
            console.log(e);
            alert('Unable to fetch location');
        });
    }

    else {
        return alert('Your browser dont support geolocation');
    }
});