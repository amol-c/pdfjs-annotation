import React, {useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
import {Toolbar,TodosDispatch} from "./Toolbar/Toolbar"
import { TextBoxAnnotation, texboxAnnotationReducer } from "./Annotations/Textbox"

function App() {
  // const [drawFlag, startDrawing] = useState(false);
  const initialState = {}
  const [_, dispatch] = useReducer(texboxAnnotationReducer, initialState);

  return (
    <div className="App">
      <Toolbar annotationDispatch={dispatch}/>
       <TextBoxAnnotation />
      <header className="App-header">
        <canvas className="A4 page" id="the-canvas" width="480" height="600"></canvas>
      </header>
    </div>
  );
}

export default App;
