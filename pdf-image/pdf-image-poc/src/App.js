import React, {useReducer, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Toolbar,TodosDispatch} from "./Toolbar/Toolbar"
import { TextBoxAnnotation, texboxAnnotationReducer } from "./Annotations/Textbox"
import {fabric} from "fabric"
import $ from "jquery"

let canvas: fabric.Canvas

$( document ).ready(function() {
    if(!canvas) {
      canvas = new fabric.Canvas('the-canvas', {
        isDrawingMode: true
      });
      canvas.backgroundColor = "white"
      canvas.freeDrawingBrush.color = "red";
      canvas.freeDrawingBrush.width = parseInt(2, 10) || 1;
      canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: parseInt(2, 10) || 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: "red",
      });
      canvas.renderAll()  
    } 
});

function App() {
  const initialState = {}
  const [_, dispatch] = useReducer(texboxAnnotationReducer, initialState);

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
