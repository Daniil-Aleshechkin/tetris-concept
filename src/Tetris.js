import Board from "./Board"
import React, { useEffect } from "react"
import { useState, useRef } from "react"
import PieceQueue from "./PieceQueue";

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

const Tetris = ({width, height, startingBoardState, startingPieceQueue, generatePieceQueue}) => {
  const [actions, setActions] = useState({"moveLeft": null, "moveRight": null, "dasLeft": null, "dasRight": null, "softDrop": null, "hardDrop": null, "90Rotate": null, "180Rotate": null, "holdPiece": null})
  const [currentDAS, setCurrentDAS] = useState({time: 0, direction: 0})
  const [controls, setConstrols] = useState({"moveLeft": "ArrowLeft", "moveRight": "ArrowRight", "hardDrop": "Space", "softDrop": "ArrowDown", "90Rotate": "ArrowUp", "180Rotate": "KeyZ", "270Rotate": "KeyX", "holdPiece": "ShiftLeft"})
  const [currentPiece, setCurrentPiece] = useState(startingPieceQueue[0])
  const [board, setBoard] = useState(startingBoardState)
  const [queue, setQueue] = useState(startingPieceQueue.slice(1))

  const DAS_TIME = 1000;

  function generateBag() {
    let pieces = ["T", "S", "Z", "L", "J", "I", "O"]

    for( let i = 0; i < 7; i ++) {
      let randIndex = Math.floor(Math.random()*7);
      let tmp = pieces[i]
      pieces[i] = pieces[randIndex]
      pieces[randIndex] = tmp
    }

    return pieces
  }

  function popPiece () {
    let nextPiece = queue[0]
    let newQueue = queue.slice(1)

    if (generatePieceQueue && queue.length <= 14 ) {
      newQueue.concat(generateBag())
    }

    setQueue(newQueue);
    return nextPiece;
  }

  const onKeyDownHandler = event => {
    switch(event.code) {
      case controls["moveLeft"]:
        if (actions["dasLeft"] === null) {
          setCurrentDAS({time: Date.now(), direction: -1})
          enableAction("dasLeft")
        }

        if (actions["moveLeft"] === null) {
          enableAction("moveLeft")
        }
        break;
      case controls["moveRight"]:
        if (actions["dasRight"] === null) {
          setCurrentDAS({time: Date.now(), direction: 1})
          enableAction("dasRight")
        }

        if (actions["moveRight"] === null) {
          enableAction("moveRight")
        }
        break;
      case controls["90Rotate"]:
        if (actions["90Rotate"] === null) {
          enableAction("90Rotate")
        }
        break;
      case controls["softDrop"]:
        if (actions["softDrop"] === null) {
          enableAction("softDrop")
        }
        break;
      case controls["hardDrop"]:
        if (actions["hardDrop"] === null) {
          enableAction("hardDrop")
        }
        break;
      case controls["270Rotate"]:
        if (actions["270Rotate"] === null) {
          enableAction("270Rotate")
        }
        break;
      case controls["180Rotate"]:
        if (actions["180Rotate"] === null) {
          enableAction("180Rotate")
        }
        break;
      case controls["holdPiece"]:
        if (actions["holdPiece"] === null) {
          enableAction("holdPiece")
        }
    }
  }

  const onKeyUpHandler = event => {
    switch(event.code) {
      case controls["moveLeft"]:
        if (currentDAS.direction == -1) {
          setCurrentDAS({time: 0, direction: 0});
        }
        disableAction("dasLeft")
        disableAction("moveLeft")
        break;
      case controls["moveRight"]:
        if (currentDAS.direction == 1) {
          setCurrentDAS({time: 0, direction: 0});
        }
        
        disableAction("dasRight")
        disableAction("moveRight")
        break;
      case controls["90Rotate"]:
        if (actions["90Rotate"] === null) {
          disableAction("90Rotate")
        }
        break;
      case controls["softDrop"]:
        if (actions["softDrop"] === null) {
          disableAction("softDrop")
        }
        break;
      case controls["hardDrop"]:
        if (actions["hardDrop"] === null) {
          disableAction("hardDrop")
        }
        break;
      case controls["270Rotate"]:
        if (actions["270Rotate"] === null) {
          disableAction("270Rotate")
        }
        break;
      case controls["180Rotate"]:
        if (controls["180Rotate"] === null) {
          disableAction("180Rotate")
        }
        break;
      case controls["holdPiece"]:
        if (actions["holdPiece"] === null) {
          disableAction("holdPiece")
        }
    }
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

    if (actions["moveLeft"]) { 
      //move piece code here

      console.log("LEFT")
      completeAction("moveLeft")
    }

    if (actions["moveRight"]) {
      //move piece code here

      console.log("RIGHT")
      completeAction("moveRight")
    }

    if (actions["softDrop"]) {
      //soft drop code here

      console.log("SOFT DROP")
      completeAction("softDrop")
    }

    if (actions["hardDrop"]) {
      //hard drop code here
      setCurrentPiece(popPiece())

      console.log("HARD DROP")
      completeAction("hardDrop")
    }

    if (actions["holdPiece"]) {
      //hold piece code here

      console.log("HOLD")
      completeAction("holdPiece")
    }

    if (actions["90Rotate"]) {
      //90 rotate piece code here

      console.log("90 ROTATE")
      completeAction("90Rotate")
    }

    if (actions["180Rotate"]) {
      //180 rotate piece code here

      console.log("180 ROTATE")
      completeAction("180Rotate")
    }

    if (actions["270Rotate"]) {
      //270 rotate piece code here

      console.log("270 ROTATE")
      completeAction("270Rotate")
    }
    //console.log(presses, currentDAS)
  }, 30)

  return <React.Fragment>
      <div>{JSON.stringify(currentDAS)} </div>
      <div>{JSON.stringify(actions)}</div>
      <Board onKeyUp={onKeyUpHandler} onKeyDown={onKeyDownHandler} width={width} height={height} boardState={board}/>
      <PieceQueue queue={queue}/>
  </React.Fragment> 
}

export default Tetris;