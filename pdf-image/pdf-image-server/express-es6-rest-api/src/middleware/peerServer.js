import teacherIds, { teacherConnected, teacherDisconnected } from '../models/connectedTeacherIds';

export default function peerServer(peerServer) {
    console.log('setting up middleware');
    peerServer.on('connection', id => {
        console.log(`${id} connected`);
        if (id in teacherIds) {
            teacherConnected(id);
        }
    });
    peerServer.on('disconnect', id => {
        console.log(`${id} disconnected`);
        if (id in teacherIds) {
            teacherDisconnected(id);
        }
    });
    return peerServer;
}