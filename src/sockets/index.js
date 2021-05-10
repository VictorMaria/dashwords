import socketIOClient from 'socket.io-client';

export const connectToSocket = () => {
    const socket = socketIOClient(process.env.BACKEND_URL);
    return socket;
}
