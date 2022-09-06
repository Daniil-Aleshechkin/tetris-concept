import Board from "./Board"
import React, { useEffect } from "react"
import { useState } from "react"
import * as d3 from "d3-timer"

const Tetris = ({width, height}) => {
    const [presses, setPresses] = useState({})
    const [currentDAS, setCurrentDAS] = useState(0)

    const DAS_TIME = 1000;

    const onKeyDownHandler = event => {
        setPresses(presses => {
            presses[event.code] = true
            return presses
        })
    }

    const onKeyUpHandler = event => {
        setPresses(presses => {
            presses[event.code] = false
            return presses
        })
    }

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

    const [board, setBoard] = useState(STARTING_BOARD_STATE)

    var previousTime = 0;

    useEffect(() => {
        const timer = d3.timer(elapsed => {
            setCurrentDAS(2)
            if (presses["ArrowLeft"] && currentDAS === 0) {
                //setCurrentDAS(elapsed)
            }
            
            console.log(presses, currentDAS)
            previousTime = elapsed
        })
        return () => timer.stop()
    } , [])

    return <Board onKeyUp={onKeyUpHandler} onKeyDown={onKeyDownHandler} width={width} height={height} boardState={board}/>
    }

export default Tetris;