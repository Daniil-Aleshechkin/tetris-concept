import React from "react"
import { PixiComponent, Sprite } from "@inlet/react-pixi";

import {ITile, JTile, LTile, OTile, STile, TTile, ZTile} from "../public/BoardTiles"
import * as PIXI from "pixi.js"
import { BaseTexture } from "pixi.js";



const { useState, useEffect, useMemo, useCallback, useRef, forwardRef } = React;

export default function BoardTile({posX, posY, boardDimensions, texture}) {
    
    return <Sprite image={texture} height={boardDimensions.height/20} width={boardDimensions.width/10} x={posX*boardDimensions.width/10} y = {posY*boardDimensions.height/20}/>

}