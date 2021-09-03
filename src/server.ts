import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { AddressInfo } from 'ws';

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        console.log('received: %s', message);

        const broadcastRegex = /^broadcast\:/;

        if(broadcastRegex.test(message)){
           // message = message.replace(broadcastRegex, '');

            wss.clients
            .forEach(client =>{
                if(client != ws){
                    client.send(`Hello, broadcast message ->${message}`);
                }
            });
        } else {
            ws.send(`Hello, you sent -> ${message}`);
        }
        
    });

    ws.send('Hi there, I am a WebSocket server');
});

server.listen(process.env.PORT || 8999, () => {
    const info: AddressInfo = server.address() as AddressInfo;
    console.log(`Server started on port ${info.port} :)`);
});