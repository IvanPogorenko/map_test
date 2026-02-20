import {useStore} from "../store/useStore.ts";
import type {WSMessage} from "./wsTypes.ts";

let socket: WebSocket | null = null;

export const connectWebSocket = () => {
    socket = new WebSocket("ws://localhost:3004");

    socket.onopen = () => {
        console.log("connection opened");
    }

    socket.onclose = () => {
        console.log("connection closed");
    }

    socket.onerror = (error) => {
        console.error("error:", error);
    };

    socket.onmessage = async (message) => {
        const msg = JSON.parse(message.data);
        console.log("message received:", message);
        const store = useStore.getState();
        switch (msg.type) {
            case "marker_created":
                console.log("marker created");
                await store.getMarkers();
                break;
            case "marker_updated":
                console.log("marker updated with id: " + msg.id);
                await store.getMarkers();
                break;
            case "marker_deleted":
                console.log("marker deleted with id: " + msg.id);
                await store.getMarkers();
                break;
        }
    };
};

export const sendMessage = (msg: WSMessage) => {
    if (!socket){
        console.log("socket not connected");
        return;
    }
    console.log("sending message:", msg);
    socket.send(JSON.stringify(msg));
}