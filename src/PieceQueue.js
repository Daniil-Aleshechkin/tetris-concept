import React from "react"
import {ITile, JTile, LTile, STile, ZTile, OTile, TTile, DefaultTile} from "../public/BoardTiles"
import { useState } from "react";

const PieceQueue = ({queue}) => {
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

    function getPieceQueue(q) {
        let pieces = []

        for (let i = 0; i < 7; i++) {
            pieces.push(<img key={`pieceQueue-${i}`} src={getTextureFromBoardStateTile(q[i])} className="noSelect pieceQueue" width="10px" height="10px"/>)
        }
        
        return pieces;
    }

    return <div>
        {getPieceQueue(queue)}
    </div>
}

export default PieceQueue 