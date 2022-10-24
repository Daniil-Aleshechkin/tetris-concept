import React from "react"
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
        onMovePieceHandler([-1,0])
    }

    function handleMovePieceRight() {
        onMovePieceHandler([1,0])
    }

    function onKeyUpHandler(event) {
        let move = controls[event.code]

        console.log(move)
    }

    const [currentActions, setCurrentActions] = useState([])

    return <div>
        {children}
    </div>
}

export default KeyListener 