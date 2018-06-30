const path = require('path');
const express = require('express');
const http = require('http');

const { generateMessage } = require('./utils/message');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connection');
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	socket.on('createMessage', (message, callback) => {
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('from server lolster');
	});

	socket.on('disconnect', () => console.log('user was disconnected '));
});

server.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
