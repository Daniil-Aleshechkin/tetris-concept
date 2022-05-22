import React from "react"
import { PixiComponent } from "@inlet/react-pixi";

import {ITile, JTile, LTile, OTile, STile, TTile, ZTile} from "../public/BoardTiles"
import * as PIXI from "pixi.js"
import { BaseTexture } from "pixi.js";



const { useState, useEffect, useMemo, useCallback, useRef, forwardRef } = React;

console.log(ITile);


export default PixiComponent('BoardTile', {
    create: props => {
        var texture = PIXI.Texture.from(ITile);

        return new PIXI.Sprite(texture);
    },

    applyProps: (instance, oldprops, newprops) => {
        instance.width = 100;
        instance.height = 100;

        console.log(instance)
    }
});