import { io } from "socket.io-client";


export default function Socket() {
    const socket = io("http://localhost:5000");
    return socket
}
