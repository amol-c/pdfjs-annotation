
import {fabric} from "fabric"


export function saveToServer(canvas) {
  const canvasAnnotations = canvas.toDatalessJSON()
  console.log(canvasAnnotations)

}

