import React from "react"
import BoardTile from "./BoardTile"
import {ITile, JTile, LTile, STile, ZTile, OTile, TTile, DefaultTile} from "../public/BoardTiles"
const {useState, useEffect, useRef} = React



function Board ({width, height}) {
    const STARTING_BOARD_STATE = [
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "T", "", "", "", "", "", "", ""]
    ]

    function getTextureFromBoardStateTile(boardTile) {
        let tile;

        switch (boardTile) {
            case "T":
                tile = TTile
                break;
            case "I":
                tile = ITile
                break;
            case "J":
                tile = JTile
                break;
            case "L":
                tile = LTile
                break;
            case "S":
                tile = STile
                break;
            case "Z":
                tile = ZTile
                break;
            case "O":
                tile = OTile
                break;
            default:
                tile = DefaultTile
                break;
        }
        return tile
    }

    function getBoardSprites(boardState) {
        let boardSprites = []

        boardState.forEach((boardRow,posY) => {
            boardRow.forEach((boardTile, posX) => {
                boardSprites.push(
                    <BoardTile
                    key= {`${posX} ${posY}`}
                    posX={posX}
                    posY={posY}
                    boardDimensions={{width, height}}
                    texture = {getTextureFromBoardStateTile(boardTile)}
                />
                )
            })
        });

        return boardSprites
    }

    const [board, setBoard] = useState([])

    function GetRandom (array) {
        var randIndex = Math.floor(
            Math.random()*array.length
        )
        
        return array[randIndex]
    }

    let currentTexture = 0;

    function SetRandom() {
        let randomIndex = Math.floor(Math.random()*10*20);
        let randomTile = GetRandom(tiles);

        let newTexture = currentTexture+1;
        if (newTexture >=7){
            newTexture=0
        }

        if (newTexture == 4) {
            newTexture = 5
        }

        tileRefs.forEach(tile => tile.current.handleTextureUpdate(GetRandom(tiles)))
        currentTexture = newTexture;
    }

    function SafeUpdate(index, texture) {
        if (index < 200 && index >=0) {
            tileRefs[index].current.handleTextureUpdate(texture);
        }
    }
    
    var tiles = [ITile, JTile, LTile, STile, ZTile, OTile, TTile]
    var boardTiles= [];
    var tileRefs = [];
    for (var posX = 0; posX < 10; posX++) {
        for (var posY = 0; posY < 20; posY++) {
            let tileRef = useRef(null);
            boardTiles.push(<BoardTile
                key= {`${posX}, ${posY}`} ref={tileRef} posX={posX} posY={posY} boardDimensions= {{width, height}} startTexture={DefaultTile}/>)
            tileRefs.push(tileRef);
        }
    }
    setInterval(SetRandom, 17);
    return( 
        
        <React.Fragment>
            {boardTiles}
        </React.Fragment> 
    )
}

export default Board;
