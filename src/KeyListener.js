import React from "react"
import { useState, useRef } from "react"
import {getTileLocationsFromPieceAndRotations} from "../public/PieceRotations"
import { getPieceSizesFromPieceType } from "../public/PieceSizes"

const KeyListener = ({onMovePieceHandler, onHardDropHandler, onSoftDropHandler, onHoldPieceHandler, onRotatePieceHandler, children}) => {
    const [controls, setControls] = useState({"ArrowLeft": "moveLeft", "ArrowRight": "moveLeft", "Space": "hardDrop", "ArrowDown": "softDrop", "ArrowUp": "90Rotate", "KeyZ": "180Rotate", "KeyX": "270Rotate", "ShiftLeft": "holdPiece"})
    const handlers = {
        "moveLeft" : handleMovePieceLeft,
        "moveRight" : handleMovePieceRight,
        "holdPiece": onHoldPieceHandler,
        "90Rotate" : () => onRotatePieceHandler(1),
        "180Rotate": () => onRotatePieceHandler(2),
        "270Rotate": () => onRotatePieceHandler(3),
        "softDrop": onSoftDropHandler,
        "hardDrop": onHardDropHandler}

    function handleMovePieceLeft() {
        //onMovePieceHandler([-1,0])
        console.log("MOVE LEFT")
        let code = Math.random();
        setCurrentActions(actions => {
            actions.filter(action => action.code=="moveLeft").dasCode = code;
            return [...actions]
        })
        setTimeout(() => dasPieceLeft(code), 1000)
        
    }

    function handleMovePieceRight() {
        //onMovePieceHandler([1,0])
        console.log("MOVE RIGHT")
        let code = Math.random();
        setCurrentActions(actions => {
            actions.filter(action => action.code=="moveRight").dasCode = code;
            return [...actions]
        })
        setTimeout(() => dasPieceRight(code), 1000)
    }

    function dasPieceLeft(code) {
        console.log(currentActions)
        if (currentActions.filter(action => action.dasCode == code).length == 1) {
            console.log("DAS LEFT")
        }
        
    }

    function dasPieceRight(code) {
        if (currentActions.filter(action => action.dasCode == code).length == 1) {
           console.log("DAS RIGHT")
        }
    }

    function onKeyUpHandler(event) {
        let move = controls[event.code]

        console.log(move, event.code)
        setCurrentActions(actions => [...actions.filter(action => action.code != move)])
    }

    function onKeyDownHandler(event) {
        let move = controls[event.code]
        if (currentActions.filter(action => action.code == move).length == 0) {

            //console.log(move, event.code)
            setCurrentActions(actions => {
                return [{code: move}, ...actions]
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