import React, {useReducer, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Toolbar,TodosDispatch} from "./Toolbar/Toolbar"
import { annotationReducer } from "./reducers/AnnotationReducer"
import {fabric} from "fabric"
import {fetchFromServer} from "./Networking/Networking"
import {initializePeerConnection, join, getUserIds, peerDataSubject} from "./Networking/PeerNetworking"

import $ from "jquery"
import { peerReducer } from './reducers/PeerReducer';
import Homepage from './Homepage';
import Confetti from 'react-dom-confetti';

function Canvas({viewingStudentId}) {
  const initialState = {}
  const [_, dispatch] = useReducer(annotationReducer, initialState);
  const [peerState, peerDispatch] = useReducer(peerReducer, initialState);

  let [canvas, setCanvas] = useState(null);

  let [confettiFlag, setConfetti] = useState(false)

  const canvasId = "the-canvas"

  useEffect(() => {
    const runEffect = async () => {
      if(!canvas) {
            const fabricCanvas = await fetchFromServer().then(result => {
                console.log(result)
                let fabricCanvas = new fabric.Canvas(canvasId, {
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
              })
  
          peerDataSubject.subscribe(([{type, data}, incomingPeerId]) => {
            console.log(incomingPeerId)
              switch (type) {
                case "annotations":
                    if(viewingStudentId && (incomingPeerId !== viewingStudentId)) {
                      return
                    }

                    const peerDispatchFunc = sendToPeerFunc(fabricCanvas, peerDispatch)
          
                    removeFabricEventListener(fabricCanvas)
                    updateCanvas(fabricCanvas, data.objects)
                    setupFabricEventListener(fabricCanvas, peerDispatchFunc)      
                return
                case "helpRequest":
                    window.alert(`${data} needs help.`);
                return
                case "command":
                  if(data === "KUDOS") {
                    setConfetti(true)
                    setTimeout(() => {
                      setConfetti(false)
                    }, 1000)
                  }
                return
              }
          })
    }}
    runEffect();
  });

  const confettiConfig = {
    angle: 90,
    spread: "1000",
    startVelocity: 100,
    elementCount: 100,
    dragFriction: 0.1,
    duration: 5000,
    stagger: 0,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };
  
  return (
    <div className="App">
      <Toolbar annotationDispatch={dispatch} fabricCanvas={canvas} peerDispatch={peerDispatch} viewingStudentId={viewingStudentId} />
      <header className="App-header">
        <canvas className="A4 page" id={canvasId} width="480" height="600"></canvas>
      </header>
      <Confetti config={confettiConfig} active={confettiFlag}/>
    </div>
  );
}

export function updateCanvas(fabricCanvas, objects) {
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

const sendToPeerFunc = (fabricCanvas, peerDispatch) => {
  return () => peerDispatch({type: "sendToPeer", canvas: fabricCanvas})
}

export default () => {
  const isTeacher = getUserIds()[2];

  const [viewingStudentId, setViewingStudentId] = useState(null);

  useEffect(() => {
    initializePeerConnection().then(() => {
      return join()
    })  
  }, [])

  if (!isTeacher || viewingStudentId) {
    return <Canvas viewingStudentId={viewingStudentId} />;
  }

  return <Homepage setViewingStudentId={setViewingStudentId} />
}