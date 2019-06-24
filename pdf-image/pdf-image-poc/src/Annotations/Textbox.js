import React, {useEffect} from 'react';

import {fabric} from "fabric"
import {saveToServer} from "../Networking/Networking"

let canvas

export function texboxAnnotationReducer(state, action) {
  switch (action.type) {
    case 'drawTextbox':
      addText()
      return
    case 'initializeAudio':
      return
    case 'handToolSelected':
    handToolSelected()
    return
    case 'startDrawing':
      startDrawing()
      return
    case 'saveToServer':
      saveToServer(canvas)
      return
    case 'addImage':
      addImage()
      return
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

function addImage() {
  fabric.Image.fromURL('https://images.unsplash.com/photo-1516222338250-863216ce01ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80', (image) => {
    image.scale(0.3)
    canvas.add(image)
  })
}
