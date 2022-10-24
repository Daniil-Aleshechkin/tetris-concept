import React from "react"
import {getTileLocationsFromPieceAndRotations} from "../public/PieceRotations"
import { getPieceSizesFromPieceType } from "../public/PieceSizes"

const KeyListener = ({onMovePieceHandler, onHardDropHandler, onSoftDropHandler, onHoldPieceHandler, onRotatePieceHandler, children}) => {
    const [controls, setControls] = useState({"ArrowLeft": "moveLeft", "ArrowRight": "moveLeft", "Space": "hardDrop", "ArrowDown": "softDrop", "ArrowUp": "90Rotate", "KeyZ": "180Rotate", "KeyX": "270Rotate", "ShiftLeft": "holdPiece"})
    const handlers = {"moveLeft" : }
    const [activeActions, setActiveActions] = useState([])


    function handleMovePieceLeft() {
        onMovePieceHandler([-1,0])
    }

    function onMoveRightHandler() {
        onMovePieceHandler([1,0])
    }

    function () {
        
    }


    const [currentActions, setCurrentActions] = useState([])

    return <div>
        {children}
    </div>
}

export default KeyListener 