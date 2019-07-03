import { addText, handToolSelected, startDrawing, addImage, increaseCanvas, decreaseCanvas} from "../Annotations/Annotations";
import {saveToServer} from "../Networking/Networking"

export function annotationReducer(state, action) {
  const canvas = action.canvas
  if(!canvas) {
    throw new Error("Canvas needs to be part of action")
  }
  switch (action.type) {
    case 'drawTextbox':
      addText(canvas)
      return
    case 'initializeAudio':
      return
    case 'handToolSelected':
    handToolSelected(canvas)
    return
    case 'startDrawing':
      startDrawing()
      return
    case 'saveToServer':
      saveToServer(canvas)
      return
    case 'addImage':
      addImage(canvas)
      return
    case 'increaseCanvas':
        increaseCanvas(canvas)
      return
    case 'decreaseCanvas':
      decreaseCanvas(canvas)
      return
    default:
      throw new Error();
  }
}
