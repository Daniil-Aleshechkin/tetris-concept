import React from "react"
import BoardTile from "./BoardTile"
import {ITile, JTile, LTile, STile, ZTile, OTile, TTile, DefaultTile} from "../public/BoardTiles"
const {useState, useEffect} = React



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
            {getBoardSprites(STARTING_BOARD_STATE)}
        </React.Fragment> 
    )
}

export default Board;
