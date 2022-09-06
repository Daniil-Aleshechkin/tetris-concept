import React from "react"
import BoardTile from "./BoardTile"
import {ITile, JTile, LTile, STile, ZTile, OTile, TTile, DefaultTile} from "../public/BoardTiles"

function Board ({width, height, boardState, onKeyDown, onKeyUp}) {
    const TILE_HEIGHT = height/20;
    const TILE_WIDTH = width/10;

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
                    tileDimensions={{height: TILE_WIDTH, width: TILE_HEIGHT}}
                    texture = {getTextureFromBoardStateTile(boardTile)}
                />
                )
            })
        });

        return boardSprites
    }

    return( 
        <div tabIndex="0" onKeyDown={onKeyDown} onKeyUp={onKeyUp} id="board" style={{"--width": width/10}}>
            {getBoardSprites(boardState)}
        </div>   
    )
}

export default Board;
