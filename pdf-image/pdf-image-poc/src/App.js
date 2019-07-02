import React, {useReducer, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Toolbar,TodosDispatch} from "./Toolbar/Toolbar"
import { annotationReducer } from "./reducers/AnnotationReducer"
import {fabric} from "fabric"
import {fetchFromServer} from "./Networking/Networking"
import {initializePeerConnection, join} from "./Networking/PeerNetworking"

import $ from "jquery"

function App() {
  const initialState = {}
  const [_, dispatch] = useReducer(annotationReducer, initialState);
  let [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if(!canvas) {
      fetchFromServer().then(result => {
          console.log(result)
          let fabricCanvas = new fabric.Canvas('the-canvas', {
            isDrawingMode: true
          });
          let objects = []
          if(result.length > 0) {
            objects = result[0].objects
          }
          fabricCanvas = updateCanvas(fabricCanvas, objects, dispatch)
          setCanvas(fabricCanvas) 
          return fabricCanvas
        }).then((canvas) => {
          return initializePeerConnection((data) => {
            console.log(`Updating canvas`)
            console.log(data)
            updateCanvas(canvas, data.objects, dispatch)
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

function updateCanvas(fabricCanvas, objects, dispatch) {
  console.log(fabricCanvas)
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

  fabricCanvas.on('object:modified', function (event) {
    dispatch({type: "sendToPeer", canvas: fabricCanvas})
  });

  fabricCanvas.on('object:added', function(event) {
    dispatch({type: "sendToPeer", canvas: fabricCanvas})
  })

  return fabricCanvas
}

export default App;
