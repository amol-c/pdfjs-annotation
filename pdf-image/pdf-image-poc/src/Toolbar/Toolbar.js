import React, { Component, useContext, useState } from 'react';
import { sendToPeer, getUserIds } from '../Networking/PeerNetworking';
export const TodosDispatch = React.createContext(null);

const style = {
  display: 'flex',
  backgroundColor: '#d6e2ea',
  padding: '6px 8px',
  flexDirection: 'vertical'
};

export const Toolbar = (props) => {
  const annotationDispatch = props.annotationDispatch
  const peerDispatch = props.peerDispatch
  const canvas = props.fabricCanvas
  const urlParams = new URLSearchParams(window.location.search);
  const viewingStudentId = props.viewingStudentId
  const [requestHelp, setRequestHelp] = useState(false)



  // Display tools.
  if(viewingStudentId) {
    return (
      <div style={style}>
        <div style={{flex: 1}}></div>
        <button onClick={() => {peerDispatch({type: "sendKudos", viewingStudentId: viewingStudentId})}}>Kudos</button>
      </div>
    );
  }


  return (
    <div style={style}>
      <button onClick={() => {annotationDispatch({type: "drawTextbox", canvas: canvas})}}>Textbox</button>
      <div style={{flex: 1}}></div>
      <button onClick={()=>{annotationDispatch({type: "addImage", canvas: canvas})}}>Image</button>
      <div style={{flex: 1}}></div>
      <button>Audio</button>
      <div style={{flex: 1}}></div>
      <button onClick={() => {annotationDispatch({type: "handToolSelected", canvas: canvas})}}>Hand Tool</button>

      <div style={{flex: 1}}></div>
      <button onClick={() => {annotationDispatch({type: "startDrawing", canvas: canvas})}}>Start Drawing</button>
      <div style={{flex: 1}}></div>
      <button onClick={() => {annotationDispatch({type: "increaseCanvas", canvas: canvas})}}>+</button>
      <div style={{flex: 1}}></div>
      <button onClick={() => {annotationDispatch({type: "decreaseCanvas", canvas: canvas})}}>-</button>
      <div style={{flex: 1}}></div>
      <button onClick={() => {annotationDispatch({type: "saveToServer", canvas: canvas})}}>Save</button>
      <div style={{flex: 1}}></div>
      <button onClick={() => {
        console.log(requestHelp)
        const shouldRequestHelp = !requestHelp
        setRequestHelp(shouldRequestHelp)
        sendToPeer({type: "helpRequest", data: shouldRequestHelp})}
        }>{requestHelp ? "Waiting for teacher" : "Ask for Help" }</button>
    </div>
  );
}
