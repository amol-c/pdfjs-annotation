import React, { Component, useContext } from 'react';
export const TodosDispatch = React.createContext(null);

const style = {
  display: 'flex',
  backgroundColor: '#d6e2ea',
  padding: '6px 8px',
  flexDirection: 'vertical'
};

export const Toolbar = (props) => {
  const annotationDispatch = props.annotationDispatch
  return (
    <div style={style}>
      <button onClick={() => {annotationDispatch({type: "drawTextbox"})}}>Textbox</button>
      <div style={{flex: 1}}></div>
      <button>Image</button>
      <div style={{flex: 1}}></div>
      <button>Audio</button>
      <div style={{flex: 1}}></div>
      <button onClick={() => {annotationDispatch({type: "handToolSelected"})}}>Hand Tool</button>

      <div style={{flex: 1}}></div>
      <button onClick={() => {annotationDispatch({type: "startDrawing"})}}>Start Drawing</button>
    </div>
  );
}
