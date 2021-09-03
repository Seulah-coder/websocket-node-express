"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('received: %s', message);
        const broadcastRegex = /^broadcast\:/;
        if (broadcastRegex.test(message)) {
            // message = message.replace(broadcastRegex, '');
            wss.clients
                .forEach(client => {
                if (client != ws) {
                    client.send(`Hello, broadcast message ->${message}`);
                }
            });
        }
        else {
            ws.send(`Hello, you sent -> ${message}`);
        }
    });
    ws.send('Hi there, I am a WebSocket server');
});
server.listen(process.env.PORT || 8999, () => {
    const info = server.address();
    console.log(`Server started on port ${info.port} :)`);
});
//# sourceMappingURL=server.js.map