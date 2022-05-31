import logo from "./logo.svg";
import "./App.css";

import { useRef, useState } from "react";

import {MapContainer,TileLayer } from 'react-leaflet';
import MapField from "./MapField";


// const position = [51.505, -0.09];
// const mapStyle = { height: "100vh" };


function App() {
  let result = 1500;
  const [score, setScore] = useState(result); 
  const mapRef = useRef();
  
  

  return (
    <div>

      <div>Total Score:{score}</div>
     <MapField score={score} setScore={setScore} result={result}></MapField>
   
    </div>
  );
}

export default App;
