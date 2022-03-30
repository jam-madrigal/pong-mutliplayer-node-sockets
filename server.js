const server = require('http').createServer();
// Importing socket.io and attaching it to our server
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}...`);
});

// Variable for tracking how many players are ready
let readyPlayerCount = 0;

// Registering an event listener for the connection event, which happens every time a user connects, and logging the user's socket id
io.on('connection', (socket) => {
    console.log('User connected', socket.id);
    // Listening for a user to connect and be ready, then incrementing our ready player count each time
    socket.on('ready', () => {
        console.log('Player ready', socket.id);

        readyPlayerCount++;
        // Broadcast the start game event when both players are ready, and send the player referee id, which will always be the second player in this case
        if (readyPlayerCount === 2) {
            io.emit('startGame', socket.id);
        }  
    });
});