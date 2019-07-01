import Peer from 'peerjs';

const myId = `iSyF5aoxn4H5U0UvDEPpE00Tr1ovkxhh6d65XUv66lcSb1bAsWqcpdSfQrv18tlHGaaeQdC01HQzSKCMft5geDTjRnlKPYgxtR8VebWHsGxJMUVhdQsfGqBNkB5uyChz8h0eywpY83uKX8xN9wAMhCTPePHKjMuS`

const remotePeerId = `FXlKpoOBB5bxPTAjTWPyKoWNkx17cXF1R4kmJp9iLkFvXKqn5jQ0jVWpqIOTZ32Z3QxwUsilHntbHBBwb2YpxFfeCZUjMTu2FSQ6imgXi1eh6BLyRbA9qEw73tnwt95WfyeaLX6Wl4pM68ey6TI4rLjnSJWeBNpt`

const DEPLOY = false

let peer
let conn

export function initializePeerConnection() {
  if (DEPLOY) {
     peer = new Peer(remotePeerId); 

     conn = peer.connect(myId);  
  } else {
     peer = new Peer(myId); 

     conn = peer.connect(remotePeerId);  
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

  peer.on('connection', (conn) => {
    conn.on('data', (data) => {
      // Will print 'hi!'
      console.log(data);
    });
  });  
}
