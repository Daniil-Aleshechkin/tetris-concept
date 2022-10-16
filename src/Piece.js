import React from "react"
import {getTileLocationsFromPieceAndRotations} from "../public/PieceRotations"
import { getPieceSizesFromPieceType } from "../public/PieceSizes"

const Piece = ({tileDimensions, texture, rotation, pieceType, location}) => {
    function getPiece() {
        //console.log(rotation, pieceType)
        //console.log(getTileLocationsFromPieceAndRotations(pieceType, rotation))
        return getTileLocationsFromPieceAndRotations(pieceType, rotation).map(pieceLocation => {
            //console.log(pieceLocation)
            return <img
                key={Math.random()}
                style={{"left": `${pieceLocation[0]*tileDimensions.width}px`, "top": `${pieceLocation[1]*tileDimensions.height}px`}}
                src={texture}
                width= {tileDimensions.width}
                height= {tileDimensions.height}
            />
        })
    }
    
    return <div style={{"left": `${location[0]*tileDimensions.width}px`, "top": `${location[1]*tileDimensions.height}px`}} className="piece" width={tileDimensions.width*getPieceSizesFromPieceType(pieceType)} height={tileDimensions.height*getPieceSizesFromPieceType(pieceType)}>
        {getPiece()}
    </div>
}

export default Piece 