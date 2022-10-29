import React from "react"
import { useState, useRef } from "react"
import {getTileLocationsFromPieceAndRotations} from "../public/PieceRotations"
import { getPieceSizesFromPieceType } from "../public/PieceSizes"

const KeyListener = ({onDasDisable, onMovePieceLeftHandler, onMovePieceRightHandler, onHardDropHandler, onSoftDropHandler, onHoldPieceHandler, onRotatePieceHandler, children, dasDelay}) => {
    const [controls, setControls] = useState({"ArrowLeft": "moveLeft", "ArrowRight": "moveRight", "Space": "hardDrop", "ArrowDown": "softDrop", "ArrowUp": "90Rotate", "KeyZ": "180Rotate", "KeyX": "270Rotate", "ShiftLeft": "holdPiece"})
    const handlers = {
        "moveLeft" : onMovePieceLeftHandler,
        "moveRight" : onMovePieceRightHandler,
        "holdPiece": onHoldPieceHandler,
        "90Rotate" : () => onRotatePieceHandler(1),
        "180Rotate": () => onRotatePieceHandler(2),
        "270Rotate": () => onRotatePieceHandler(3),
        "softDrop": onSoftDropHandler,
        "hardDrop": onHardDropHandler}

    function onKeyUpHandler(event) {
        let move = controls[event.code]
        
        if (move == "moveLeft" ) {
            onDasDisable("left")
        } else if (move == "moveRight") {
            onDasDisable("right")
        }

        setCurrentActions(actions => {
            return [...actions.filter(action => action != move)]})
    }

    function onKeyDownHandler(event) {
        let move = controls[event.code]
        if (currentActions.filter(action => action == move).length == 0) {

            setCurrentActions(actions => {
                return [move, ...actions]
            })
            handlers[move]()

        }
    }

    const [currentActions, setCurrentActions] = useState([])

    return <div onKeyDown={onKeyDownHandler} onKeyUp={onKeyUpHandler}>
        {children}
    </div>
}

export default KeyListener 