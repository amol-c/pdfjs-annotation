import React, {useEffect} from 'react';

import {fabric} from "fabric"

export function texboxAnnotationReducer(state, action) {
  switch (action.type) {
    case 'drawTextbox':
      addText()
    case 'initializeAudio':
      break
    default:
      throw new Error();
  }
}
let canvas

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

