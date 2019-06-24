import React, {useReducer, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Toolbar,TodosDispatch} from "./Toolbar/Toolbar"
import { TextBoxAnnotation, texboxAnnotationReducer } from "./Annotations/Textbox"
import {fabric} from "fabric"
import $ from "jquery"

function App() {
  const initialState = {}
  const [_, dispatch] = useReducer(texboxAnnotationReducer, initialState);
  let [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if(!canvas) {
      const fabricCanvas = new fabric.Canvas('the-canvas', {
        isDrawingMode: true
      });
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
      setCanvas(fabricCanvas) 
    }
  });

  return (
    <div className="App">
      <Toolbar annotationDispatch={dispatch}/>
      <header className="App-header">
        <canvas className="A4 page" id="the-canvas" width="480" height="600"></canvas>
      </header>
      <TextBoxAnnotation fabricCanvas={canvas}/>
    </div>
  );
}

export default App;
