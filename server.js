const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// HTTP route for testing the server is running
app.get('/api/users/tiktokLive', (req, res) => {
    res.send('WebSocket server is running');
});



// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
