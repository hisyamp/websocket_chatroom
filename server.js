const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for simplicity (you can restrict this)
        methods: ["GET", "POST"]
    }
});

// Middleware to parse JSON bodies
app.use(express.json());

// Handle POST requests
app.post('/emit-event', (req, res) => {
    const data = req.body;

    // Emit the data to all connected clients via Socket.IO
    io.emit('new_data', data);

    // Send a response back to the client
    res.status(200).json({ message: 'Data emitted successfully', data });
});

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('a user connected');

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server on port 4000
server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
