export default function peerServer(peerServer) {
    console.log('setting up middleware');
    peerServer.on('connection', id => {
        console.log(`${id} connected`);
    });
    peerServer.on('disconnect', id => {
        console.log(`${id} disconnected`);
    });
    return peerServer;
}