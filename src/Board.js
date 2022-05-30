import React from "react"
import BoardTile from "./BoardTile"
import {ITile, JTile, LTile, STile, ZTile, OTile, TTile} from "../public/BoardTiles"
const {useState, useEffect} = React



function Board ({width, height}) {
    function GetRandom (array) {
        var randIndex = Math.floor(
            Math.random()*array.length
        )
        
        return array[randIndex]
    }
    
    var tiles = [ITile, JTile, LTile, STile, ZTile, OTile, TTile]
    var boardTiles= [];
    for (var posX = 0; posX < 10; posX++) {
        for (var posY = 0; posY < 20; posY++) {
            boardTiles.push(<BoardTile 
                key= {`${posX}, ${posY}`} posX={posX} posY={posY} boardDimensions= {{width, height}} texture={GetRandom(tiles)}/>)
        }
    }

    return( 
        
        <React.Fragment>
            {boardTiles}
        </React.Fragment> 
    )
}

export default Board;
