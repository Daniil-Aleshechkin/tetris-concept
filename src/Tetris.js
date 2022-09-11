import Board from "./Board"
import React, { useEffect } from "react"
import { useState, useRef } from "react"

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

const Tetris = ({width, height}) => {
    const [presses, setPresses] = useState({})
    const [actions, setActions] = useState({"moveLeft": null, "moveRight": null, "moveDown": null, "dasLeft": null, "dasRight": null})
    const [currentDAS, setCurrentDAS] = useState({time: 0, direction: 0})

    const DAS_TIME = 1000;

    const onKeyDownHandler = event => {
      if (event.code == "ArrowLeft") {
        if (actions["dasLeft"] === null) {
          setCurrentDAS({time: Date.now(), direction: -1})
          enableAction("dasLeft")
        }

        if (actions["moveLeft"] === null) {
          enableAction("moveLeft")
        }
      }

      if (event.code == "ArrowRight") {
        if (actions["dasRight"] === null) {
          setCurrentDAS({time: Date.now(), direction: 1})
          enableAction("dasRight")
        }

        if (actions["moveRight"] === null) {
          enableAction("moveRight")
        }
      }

      if (event.code == "ArrowDown") {
        if (actions["moveDown"] === null) {
          enableAction("moveDown")
        }
      }

      setPresses(presses => {
          presses[event.code] = true
          return {...presses}
      })
    }

    const onKeyUpHandler = event => {
      if (event.code == "ArrowLeft") {
        if (currentDAS.direction == -1) {
          setCurrentDAS({time: 0, direction: 0});
        }
        disableAction("dasLeft")
        disableAction("moveLeft")
      }

      if (event.code == "ArrowRight") {
        if (currentDAS.direction == 1) {
          setCurrentDAS({time: 0, direction: 0});
        }
        
        disableAction("dasRight")
        disableAction("moveRight")
      }

      if (event.code == "ArrowDown") {
        disableAction("moveDown")
      }

      setPresses(presses => {
          presses[event.code] = false
          return {...presses}
      })
    }

    function enableAction(action) {
      setActions(actions => {
        actions[action] = true
        return {...actions}
      })
    }

    function completeAction(action) {
      setActions(actions => {
        actions[action] = false
        return {...actions}
      })
    }

    function disableAction(action) {
      setActions(actions => {
        actions[action] = null
        return {...actions}
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
    
    function applyDAS() {
      if (currentDAS.direction == -1) {
        var newBoard = board;
        newBoard[19] = board[0].map(item => "T");
        setBoard(newBoard)
        completeAction("dasLeft")
      } else if (currentDAS.direction == 1) {
        var newBoard = board;
        newBoard[19] = board[0].map(item => "L");
        setBoard(newBoard)
        completeAction("dasRight")
      }
    }
    
    useInterval(() => {
      if (Date.now() - currentDAS.time >= DAS_TIME && currentDAS.time !== 0) {
        applyDAS()
      }

      if (actions["moveLeft"] && presses["ArrowLeft"]) { 
        //move piece code here

        console.log("LEFT")
        completeAction("moveLeft")
      }

      if (actions["moveRight"] && presses["ArrowRight"]) {
        //move piece code here

        console.log("RIGHT")
        completeAction("moveRight")
      }

      if (actions["moveDown"] && presses["ArrowDown"]) {
        //move piece code here

        console.log("DOWN")
        completeAction("moveDown")
      }
      //console.log(presses, currentDAS)
    }, 30)

    return <React.Fragment>
        <div>{JSON.stringify(currentDAS)} </div>
        <div>{JSON.stringify(presses)}</div>
        <Board onKeyUp={onKeyUpHandler} onKeyDown={onKeyDownHandler} width={width} height={height} boardState={board}/>
    </React.Fragment> 
    }

export default Tetris;