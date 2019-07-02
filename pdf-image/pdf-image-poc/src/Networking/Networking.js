
import {fabric} from "fabric"

const baseUrl = "http://10.0.3.29:8081"

export function saveToServer(canvas) {
  const canvasAnnotations = canvas.toDatalessJSON()
  console.log(canvasAnnotations)
  // Default options are marked with *
  const url = `${baseUrl}/api/annotations`
  return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(canvasAnnotations), // body data type must match "Content-Type" header
})
.then(response => response.json()); // parses JSON response into native Javascript objects 
}

export function fetchFromServer() {
  // Default options are marked with *
  const url = `${baseUrl}/api/annotations`
  return fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    }
})
.then(response => response.json()); // parses JSON response into native Javascript objects 
}

