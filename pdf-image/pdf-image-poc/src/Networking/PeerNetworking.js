import Peer from 'peerjs';
import uuidv4 from 'uuid/v4';
import { registerTeacherId, waitForTeacherConnected } from './Networking';

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
  const [teacherId, studentId, isTeacher] = getUserIds()
  const connectToPeer = () => new Promise((resolve ,reject) => {
    if (isTeacher) {
      peer = new Peer(teacherId, options);
    } else {
      peer = new Peer(studentId, options); 
    }

    // Create own peer object with connection to shared PeerJS server
    peer.on('disconnected', function () {
      console.log(`PEER CONNECTION DISCONNECTED`)
      // peer.reconnect();
    });

    peer.on('error', function (err) {
      console.log(err);
    });

    peer.on('connection', function(connection) {
      connection.on('open', () => {
        connection.on('data', (data) => {
          console.log("DATA Received")
          console.log(data)
          callback(data)
        })
        console.log(`CONN CONNECTED`)
        console.log(connection)
        connection.send({hi: "Sent!"});
        resolve()
      });
    })
    peer.on('open', (id) => {
      console.log(`MY PEER ID IS: ${id}`)
      resolve()
    });
  })

  if (isTeacher) {
    return registerTeacherId(teacherId).then(connectToPeer);
  } else {
    return connectToPeer();
  }
}

export function join() {
  const [teacherId, studentId, isTeacher] = getUserIds()
  const connectToPeer = () => new Promise((resolve, reject) => {
    conn = peer.connect(teacherId, {
      reliable: true,
      serialization: "json"
    });

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
  });
  if (!isTeacher) {
    return waitForTeacherConnected(teacherId).then(connectToPeer);
  } else {
    return Promise.resolve();
  }
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

let cachedStudentId;
export function getUserIds() {
  var urlParams = new URLSearchParams(window.location.search);
  const teacherId = urlParams.get('teacherId')
  const studentId = cachedStudentId || uuidv4();
  cachedStudentId = studentId;

  const isTeacher = urlParams.get('isTeacher') === "true"

  return [teacherId, studentId, isTeacher]
}