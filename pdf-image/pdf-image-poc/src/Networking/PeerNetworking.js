import Peer from 'peerjs';

const myId = `iSyF5aoxn4123H5U0UvDEPpE00Tr1ovkxhh6d65XUv66lcSb1bAsWqcpdSfQrv18tlHGaaeQdC01HQzSKCMft5geDTjRnlKPYgxtR8VebWHsGxJMUVhdQsfGqBNkB5uyChz8h0eywpY83uKX8xN9wAMhCTPePHKjMuS`

const remotePeerId = `FXlKpoOBB5bxPTAjTWPyKoWNkx17cXF1R4kmJp9iLkFvXKqn5jQ0jVWpqIOTZ32Z3QxwUsilHntbHBBwb2YpxFfeCZUjMTu2FSQ6imgXi1eh6BLyRbA9qEw73tnwt95WfyeaLX6Wl4pM68ey6TI4rLjnSJWeBNpt`

const DEPLOY = false

let peer: Peer
let conn: Peer.DataConnection

export function initializePeerConnection(callback) {
  return new Promise((resolve ,reject) => {
    if (DEPLOY) {
      peer = new Peer(remotePeerId, {
        debug: 2
    });
    } else {
      peer = new Peer(myId, {
        debug: 2
      }); 
    }

    // Create own peer object with connection to shared PeerJS server
    peer.on('open', (id) => {
      console.log(`MY PEER ID IS: ${id}`)
      resolve()
    });

    peer.on('disconnected', function () {
      console.log(`PEER CONNECTION DISCONNECTED`)
      // peer.reconnect();
    });

    peer.on('error', function (err) {
      console.log(err);
    });

    peer.on('connection', function(connection) {
      connection.on('open', () => {
        console.log(`CONN CONNECTED`)
        connection.on('data', (data) => {
          console.log("DATA Received")
          console.log(data)
          callback(data)
        })
        connection.send('hi!');
      });
      resolve() 
    })
  })
}

export function join() {
  return new Promise((resolve, reject) => {

  if (DEPLOY) {
    conn = peer.connect(myId, {
      reliable: true,
      serialization: "json"
    });
  } else {
    // conn = peer.connect(remotePeerId, {
    //   reliable: true,
    //   serialization: "json"
    // });
    return
  }

  if(!conn) {
    console.error(`Connection is invalid`)
    reject(`Connection is invalid`)
    return
  }

  conn.on('error', (error) => {
    console.log(`ERROR`)
    console.log(error)
  })

    conn.on('close', function () {
      console.log("Connection Closed")
    });
  })
}

export function sendToPeer(data) {
  if (conn && conn.open) {
    conn.send(data)
    console.log("Data sent to Peer")
  } else {
    console.log("Failed to send data to Peer")
  }
}

export function close() {
  if (conn) {
    conn.close();
    console.log("Connection closed")
  }
}
