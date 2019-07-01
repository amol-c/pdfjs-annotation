import React, {useEffect} from 'react';

import {fabric} from "fabric"
import {saveToServer} from "../Networking/Networking"

let canvas

export function annotationReducer(state, action) {
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
    case 'increaseCanvas':
        increaseCanvas()
      return
    case 'decreaseCanvas':
      decreaseCanvas()
      return
    default:
      throw new Error();
  }
}

export const TextBoxAnnotation = (props) => {
  canvas = props.fabricCanvas
  ///
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
  fabric.Image.fromURL('https://image.slidesharecdn.com/theonepagelinuxmanual-150521050729-lva1-app6892/95/the-one-page-linux-manual-1-638.jpg?cb=1432184855', (image) => {
    image.scale(0.3)
    canvas.add(image)
  })
}

function handToolSelected() {
  canvas.isDrawingMode = false
}

function startDrawing() {
  canvas.isDrawingMode = true
}

function increaseCanvas() {
  var zoom = canvas.getZoom();
  zoom = zoom + 10/200;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.setZoom(zoom);
}

function decreaseCanvas() {
  var zoom = canvas.getZoom();
  zoom = zoom - 10/200;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.setZoom(zoom);
}
