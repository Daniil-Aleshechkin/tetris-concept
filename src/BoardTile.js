import React from "react"
import { Stage, Container, Sprite, PixiComponent, useApp, useTick } from "@inlet/react-pixi"
import {ITile, JTile, LTile, OTile, STile, TTile, ZTile} from "../public/BoardTiles"


const { useState, useEffect, useMemo, useCallback, useRef, forwardRef } = React;

console.log(ITile);


export default PixiComponent('BoardTile', {
    create: props => {
        return new Sprite();
    }
});