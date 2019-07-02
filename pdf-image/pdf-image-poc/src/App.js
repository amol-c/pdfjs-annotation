import React, {useReducer, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Toolbar,TodosDispatch} from "./Toolbar/Toolbar"
import { annotationReducer } from "./reducers/AnnotationReducer"
import {fabric} from "fabric"
import {fetchFromServer} from "./Networking/Networking"
import {initializePeerConnection, join, getUserIds} from "./Networking/PeerNetworking"

import $ from "jquery"
import { peerReducer } from './reducers/PeerReducer';
import Homepage from './Homepage';

function Canvas() {
  const initialState = {}
  const [_, dispatch] = useReducer(annotationReducer, initialState);
  const [peerState, peerDispatch] = useReducer(peerReducer, initialState);

  let [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if(!canvas) {
      const sendToPeerFunc = (fabricCanvas, peerDispatch) => {
        return () => peerDispatch({type: "sendToPeer", canvas: fabricCanvas})
      }

      fetchFromServer().then(result => {
          console.log(result)
          let fabricCanvas = new fabric.Canvas('the-canvas', {
            isDrawingMode: true
          });
          let objects = []
          if(result.length > 0) {
            objects = result[0].objects
          }
          fabricCanvas = updateCanvas(fabricCanvas, objects)
          const peerDispatchFunc = sendToPeerFunc(fabricCanvas, peerDispatch)
          setupFabricEventListener(fabricCanvas, peerDispatchFunc)
          setCanvas(fabricCanvas) 
          return fabricCanvas
        }).then((canvas) => {
          return initializePeerConnection(({type, data}) => {
            if (type === 'annotations') {
              const peerDispatchFunc = sendToPeerFunc(canvas, peerDispatch)

              removeFabricEventListener(canvas)
              updateCanvas(canvas, data.objects)
              setupFabricEventListener(canvas, peerDispatchFunc)  
            } else if (type === 'helpRequest') {
              window.alert(`${data} needs help.`);
            }
          })
        }).then(() => {
          return join()
        })
      }
  });

  return (
    <div className="App">
      <Toolbar annotationDispatch={dispatch} fabricCanvas={canvas} />
      <header className="App-header">
        <canvas className="A4 page" id="the-canvas" width="480" height="600"></canvas>
      </header>
    </div>
  );
}

function updateCanvas(fabricCanvas, objects) {
  fabricCanvas.loadFromJSON({objects: objects}, () => {
    fabricCanvas.backgroundColor = "white"
    fabricCanvas.freeDrawingBrush.color = "red";
    fabricCanvas.freeDrawingBrush.width = parseInt(2, 10) || 1;
    fabricCanvas.freeDrawingBrush.shadow = new fabric.Shadow({
      blur: parseInt(2, 10) || 0,
      offsetX: 0,
      offsetY: 0,
      affectStroke: true,
      color: "red",
    });
    fabricCanvas.renderAll()
  })

  return fabricCanvas
}

function setupFabricEventListener(fabricCanvas, sendToPeerFunc) {
  fabricCanvas.on('object:modified', sendToPeerFunc);

  fabricCanvas.on('object:added', sendToPeerFunc)
}

function removeFabricEventListener(fabricCanvas) {
  fabricCanvas.off('object:modified');
  fabricCanvas.off('object:added');
}

export default () => {
  const isTeacher = getUserIds()[2];
  const viewingStudentId = getUserIds()[3];

  if (!isTeacher || viewingStudentId) {
    return <Canvas />;
  }
  return <Homepage />
}