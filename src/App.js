import React from "react";

import Board from "./Board"

import { Stage, Sprite } from '@inlet/react-pixi'

const App = () => (
  <Stage width={500} height={800}>
      <Board />
  </Stage>
)

export default App