import {sendToPeer} from "../Networking/PeerNetworking"

export function peerReducer(state, action) {
  const canvas = action.canvas
  if(!canvas) {
    throw new Error("Canvas needs to be part of action")
  }

  switch (action.type) {
    case 'sendToPeer':
      const canvasAnnotations = canvas.toDatalessJSON()
      sendToPeer({type: 'annotations', data: canvasAnnotations})
      return
    default:
      throw new Error();    
  }
}
