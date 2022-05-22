import React from "react";

import Board from "./Board"

import { Stage, Sprite } from '@inlet/react-pixi'

const App = () => (
  <Stage width={1000} height={2000}>
      <Board />
  </Stage>
)

export default App