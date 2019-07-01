import Peer from 'peerjs';
import uuidv4 from 'uuid/v4';

const myId = uuidv4();

const remotePeerId = `FXlKpoOBB5bxPTAjTWPyKoWNkx17cXF1R4kmJp9iLkFvXKqn5jQ0jVWpqIOTZ32Z3QxwUsilHntbHBBwb2YpxFfeCZUjMTu2FSQ6imgXi1eh6BLyRbA9qEw73tnwt95WfyeaLX6Wl4pM68ey6TI4rLjnSJWeBNpt`

const DEPLOY = false

let peer
let conn

const options = {
  host: 'localhost',
  port: 8081,
  path: '/peerjs'
}

export function initializePeerConnection() {
  if (DEPLOY) {
     peer = new Peer(remotePeerId, options); 

     // conn = peer.connect(myId);  
  } else {
     peer = new Peer(myId, options); 

     // conn = peer.connect(remotePeerId);  
  }

  if(!conn) {
    console.error(`CLIENT NOT FOUND`)
    return
  }

  conn.on('open', () => {
    console.log(`CONNECTED`)
    conn.send('hi!');
  });

  conn.on('error', (error) => {
    console.error(error)
  })
}
