var socket = io();
socket.on('connect', () => {
	console.log('connected to server');
});
socket.on('newMessage', (message) => {
	console.log('newMessage', message);
	const li = jQuery('<li></li>');
	li.text(`${message.from}:${message.text}`);
	jQuery('#messages').append(li);
});
socket.on('disconnect', () => {
	console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', (e) => {
	e.preventDefault();
	socket.emit(
		'createMessage',
		{
			from: 'User',
			text: jQuery('[name=message]').val()
		},
		() => {}
	);
});
