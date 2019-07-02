import React, {useEffect} from 'react';

import {fabric} from "fabric"

export function addText(canvas) {
  const text = new fabric.IText("MY Text", {
    textAlign: "center",
    left: 50,
    top: 100,
    fontSize: 50
  });

  canvas.add(text)
}

export function addImage(canvas) {
  fabric.Image.fromURL('https://image.slidesharecdn.com/theonepagelinuxmanual-150521050729-lva1-app6892/95/the-one-page-linux-manual-1-638.jpg?cb=1432184855', (image) => {
    image.scale(0.3)
    canvas.add(image)
  })
}

export function handToolSelected(canvas) {
  canvas.isDrawingMode = false
}

export function startDrawing(canvas) {
  canvas.isDrawingMode = true
}

export function increaseCanvas(canvas) {
  var zoom = canvas.getZoom();
  zoom = zoom + 10/200;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.setZoom(zoom);
}

export function decreaseCanvas(canvas) {
  var zoom = canvas.getZoom();
  zoom = zoom - 10/200;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.setZoom(zoom);
}
