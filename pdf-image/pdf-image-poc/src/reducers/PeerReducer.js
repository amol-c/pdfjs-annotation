import {sendToPeer, sendKudosToStudent} from "../Networking/PeerNetworking"

export function peerReducer(state, action) {
  switch (action.type) {
    case 'sendToPeer':
      const canvas = action.canvas
      if(!canvas) {
        throw new Error("Canvas needs to be part of action")
      }
      const canvasAnnotations = canvas.toDatalessJSON()
      sendToPeer({type: 'annotations', data: canvasAnnotations})
      return
    case 'sendKudos':
        const viewingStudentId = action.viewingStudentId
        sendKudosToStudent(canvasAnnotations)
        return
    default:
      throw new Error();
  }
}
