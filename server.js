const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);  // Create an HTTP server
const io = new Server(server, {         // Attach Socket.IO to the server
    cors: {
        origin: "*:*",    // Allow all origins (you can specify domains for security)
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
});

// Middleware to parse JSON request bodies
app.use(express.json());

// POST endpoint to receive data and emit it to connected clients
app.post('/emit-event', (req, res) => {
    const data = req.body;
    console.log("websocket hitedd", data)
    // Emit data to all connected WebSocket clients
    io.emit('new_data', data);

    // Send a success response
    res.status(200).json({ message: 'Data emitted successfully', data });
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server on port 4000
server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
