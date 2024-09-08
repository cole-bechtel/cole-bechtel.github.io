const socket = io('https://Board-Games-Server .repl.co/');

const message = 'Hello, server!';
socket.emit('message', message);

socket.on('message', (msg) => {
    console.log('Message from server: ' + msg);
});