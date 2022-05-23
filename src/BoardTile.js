import React from "react"
import { PixiComponent } from "@inlet/react-pixi";

import {ITile, JTile, LTile, OTile, STile, TTile, ZTile} from "../public/BoardTiles"
import * as PIXI from "pixi.js"
import { BaseTexture } from "pixi.js";



const { useState, useEffect, useMemo, useCallback, useRef, forwardRef } = React;

export default PixiComponent('BoardTile', {
    create: props => {
        
        var texture = PIXI.Texture.from(props.texture);

        return new PIXI.Sprite(texture);
    },

    applyProps: (instance, oldprops, newprops) => {
        const {boardDimensions, posX, posY, ...newP} = newprops;
        instance.width = boardDimensions.width/10;
        instance.height = boardDimensions.height/20;
        instance.position = new PIXI.ObservablePoint(null, null, newprops.posX*instance.width, newprops.posY*instance.height)

    }
});