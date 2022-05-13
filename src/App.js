import React from "react";

import BoardTile from "./BoardTile";

import { Stage, Sprite } from '@inlet/react-pixi'

const App = () => (
  <Stage>
      <BoardTile />
  </Stage>
)

export default App