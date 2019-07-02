import Peer from 'peerjs';
import uuidv4 from 'uuid/v4';

const DEPLOY = true;

let peer: Peer
let conn: Peer.DataConnection

const options = {
  debug: 2,
  host: 'localhost',
  port: 8081,
  path: 'peerjs'
}

export function initializePeerConnection(callback) {
  return new Promise((resolve ,reject) => {
    const [teacherId, studentId, isTeacher] = getUserIds()
    console.log(isTeacher)
    if (isTeacher) {
      peer = new Peer(teacherId, options);
    } else {
      peer = new Peer(studentId, options); 
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
    const [teacherId, studentId, isTeacher] = getUserIds()

  if (isTeacher) {
    resolve();
    return;
  } else {
    conn = peer.connect(teacherId, {
      reliable: true,
      serialization: "json"
    });
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
      setTimeout(function() {
        join()
      }, 100)
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

function getUserIds() {
  var urlParams = new URLSearchParams(window.location.search);
  const teacherId = urlParams.get('teacherId')
  const studentId = uuidv4();

  const isTeacher = urlParams.get('isTeacher') === "true"

  return [teacherId, studentId, isTeacher]
}
