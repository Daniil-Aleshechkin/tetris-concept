import React from "react"
import { useState, useRef } from "react"
import {getTileLocationsFromPieceAndRotations} from "../public/PieceRotations"
import { getPieceSizesFromPieceType } from "../public/PieceSizes"

const KeyListener = ({onMovePieceHandler, onHardDropHandler, onSoftDropHandler, onHoldPieceHandler, onRotatePieceHandler, children, dasDelay}) => {
    const [controls, setControls] = useState({"ArrowLeft": "moveLeft", "ArrowRight": "moveRight", "Space": "hardDrop", "ArrowDown": "softDrop", "ArrowUp": "90Rotate", "KeyZ": "180Rotate", "KeyX": "270Rotate", "ShiftLeft": "holdPiece"})
    const handlers = {
        "moveLeft" : handleMovePieceLeft,
        "moveRight" : handleMovePieceRight,
        "holdPiece": onHoldPieceHandler,
        "90Rotate" : () => onRotatePieceHandler(1),
        "180Rotate": () => onRotatePieceHandler(2),
        "270Rotate": () => onRotatePieceHandler(3),
        "softDrop": onSoftDropHandler,
        "hardDrop": onHardDropHandler}

    const [currentDASAction, setCurrentDASAction] = useState({direction: null, timeout: null})

    function handleMovePieceLeft() {
        onMovePieceHandler([-1,0])
    
        if (currentDASAction.timeout != null) {
            setCurrentDASAction(action => {
                clearTimeout(action.timeout)
                return {direction: null, timeout: null}
            })
        }
        setCurrentDASAction({direction: "left", timeout: setTimeout(dasPieceLeft, 100)})
    }

    function handleMovePieceRight() {
        onMovePieceHandler([1,0])
        
        if (currentDASAction.timeout != null) {
            setCurrentDASAction(action => {
                clearTimeout(action.timeout)
                return {direction: null, timeout: null}
            })
        }
        setCurrentDASAction({direction: "right", timeout: setTimeout(dasPieceRight, 100)})
    }

    function dasPieceLeft() {
        onMovePieceHandler([-20, 0])
    }

    function dasPieceRight() {
        onMovePieceHandler([20, 0])
    }

    function onKeyUpHandler(event) {
        let move = controls[event.code]

        if (move == "moveLeft" || currentDASAction.direction == "left") {
            setCurrentDASAction(action => {
                clearTimeout(action.timeout)
                return {direction: null, timeout : null}
            })
        } else if (move == "moveRight" || currentActions.direction == "right") {
            setCurrentDASAction(action => {
                clearTimeout(action.timeout)
                return {direction: null, timeout: null}
            })
        }

        setCurrentActions(actions => {
            console.log(actions)
            return [...actions.filter(action => action != move)]})
    }

    function onKeyDownHandler(event) {
        let move = controls[event.code]
        if (currentActions.filter(action => action == move).length == 0) {

            //console.log(move, event.code)
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