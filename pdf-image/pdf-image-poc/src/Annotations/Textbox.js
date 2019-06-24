import React, {useEffect} from 'react';

import {fabric} from "fabric"
import {saveToServer} from "../Networking/Networking"

let canvas

export function texboxAnnotationReducer(state, action) {
  switch (action.type) {
    case 'drawTextbox':
      addText()
    case 'initializeAudio':
      break
    case 'handToolSelected':
    handToolSelected()
    break
    case 'startDrawing':
      startDrawing()
      break
    case 'saveToServer':
      saveToServer(canvas)
      break
    default:
      throw new Error();
  }
}

export const TextBoxAnnotation = (props) => {
  canvas = props.fabricCanvas
  return (
    <div />
  );
}

function addText() {
  const text = new fabric.IText("MY Text", {
    textAlign: "center",
    left: 50,
    top: 100,
    fontSize: 50
  });

  canvas.add(text)
}

function handToolSelected() {
  canvas.isDrawingMode = false
}

function startDrawing() {
  canvas.isDrawingMode = true
}
