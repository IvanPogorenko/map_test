import {WebSocket, WebSocketServer} from "ws";

const wss = new WebSocketServer({ port: 3004 });
let clients = [];

wss.on("connection", (ws) => {
    console.log("Client connected");
    clients.push(ws);

    ws.on("close", () => {
        clients = clients.filter(c => c !== ws);
        console.log("Client disconnected");
    });

    ws.on("message", (message) => {
        const data = JSON.parse(message);
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });
});

console.log("WebSocket running on port 3004");