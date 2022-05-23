import React from "react";

import Board from "./Board"

import { Stage, Sprite } from '@inlet/react-pixi'

const App = () => (
  <Stage width={250} height={500}>
      <Board width={250} height={500}/>
  </Stage>
)

export default App