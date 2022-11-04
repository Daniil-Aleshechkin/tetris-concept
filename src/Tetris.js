import Board from "./Board"
import React, { useEffect } from "react"
import { useState, useRef } from "react"
import PieceQueue from "./PieceQueue";
import {getTextureFromBoardStateTile} from "../public/BoardTiles"
import Piece from "./Piece"
import { getTileLocationsFromPieceAndRotations } from "../public/PieceRotations";
import KeyListener from "./KeyListener";

const useDebounce = (val, cancel, setCancel) => {
  const [debounceVal, setDebounceVal] = React.useState(val);

  React.useEffect(() => {
    console.log(val, !cancel, val.direction != null, !val.enabled)
    let timer;
    if (!cancel && val.direction != null && !val.enabled) {
      timer = setTimeout(() => setDebounceVal(val), 100);
      console.log('timer', timer);
      setCancel(false);
    }

    // This avoids using useRef
    return () => {
      if (timer) {
        console.log('cancel', timer);
        clearTimeout(timer);
      }
    };
  }, [val, cancel, setCancel]);

  return debounceVal;
};

const Tetris = ({width, height, startingBoardState, startingPieceQueue, generatePieceQueue}) => {
  const [currentPiece, setCurrentPiece] = useState({"pieceType": (startingPieceQueue.length == 0) ? null : startingPieceQueue[0], "pieceRotation": 0, "pieceLocation" : [getPieceStartingXLocationFromPieceType(startingPieceQueue[0], 0), 0] })

  const [currentHeldPiece, setCurrentHeldPiece] = useState({pieceType: "", hasHeldPiece: false})

  const [board, setBoard] = useState(startingBoardState)
  const [queue, setQueue] = useState(startingPieceQueue.slice(1))
  function getPieceStartingXLocationFromPieceType(pieceType) {
    switch (pieceType) {
      case "O":
        return 4
      case "I":
        return 2
      default:
        return 3
    }
  }
  
  
  if (generatePieceQueue && queue.length < 14) {
    let newQueue = [...queue];
    
    newQueue = newQueue.concat(generateBag())
    newQueue = newQueue.concat(generateBag())
    if (queue.length == 0)
      setCurrentPiece(piece => {
        piece.pieceType = newQueue[0]
        return {...piece}
      })

    setQueue(newQueue.slice(1))
  }

  if (generatePieceQueue && queue.length <= 14 ) {
    if (currentPiece === undefined) {
      setCurrentPiece(queue[0])
      setQueue(queue.slice(1).concat(generateBag()))
    } else {
      setQueue(queue.concat(generateBag()))
    }
    
  }

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

  function onHandleRotatePiece(rotation) {
    //var currentTime = new Date(); 

    let newLocation = currentPiece.pieceLocation
    let newRotation = (currentPiece.pieceRotation + rotation) %4;

    if (isLeftDas) {
      newLocation = getPathFindPieceWithRotation([-1, 0], [-4, newLocation[1]], newRotation)
    } else if(isRightDas) {
      newLocation = getPathFindPieceWithRotation([1,0], [14, newLocation[1]], newRotation)
    }

    console.log(currentDAS, newLocation, newRotation)

    setCurrentPiece(piece => {
      piece.pieceRotation = newRotation
      return {...piece}
    })

    setCurrentPiece(piece => {
      piece.pieceLocation = newLocation
      return {...piece}
    })

  }

  const [currentDAS, setCurrentDAS] = useState({direction: null, enabled: false})
  const [cancelDAS, setCancelDAS] = useState(false);

  const deBouncedDAS = useDebounce(currentDAS, cancelDAS, setCancelDAS)
  
  useEffect(() => {
    if (deBouncedDAS.direction == "left") {
      movePieceLeft(10)
    } else if (deBouncedDAS.direction == "right") {
      movePieceRight(10)
    }
    setCurrentDAS({direction: deBouncedDAS.direction, enabled: true})

  }, [deBouncedDAS])

  let isLeftDas = currentDAS.direction == "left" && currentDAS.enabled
  let isRightDas = currentDAS.direction == "right" && currentDAS.enabled

  function onMovePieceRightHandler() {
    movePieceRight(1)

    setCancelDAS(true)
    setCancelDAS(false)
    setCurrentDAS({direction: "right", enabled: false})
  }

  function onMovePieceLeftHandler() {
    movePieceLeft(1)
    
    setCancelDAS(true)
    setCancelDAS(false)
    setCurrentDAS({direction: "left", enabled: false})
  }

  function onDasDisable(direction) {
    if ((direction == "left" && currentDAS.direction == "left") || (direction == "right" && currentDAS.direction == "right")) {
      setCancelDAS(true)
      setCurrentDAS({direction: null})
    }
  }

  function movePieceLeft (amount) {
    let newLocation = getPathFindPiece([-1, 0], [currentPiece.pieceLocation[0] - amount, currentPiece.pieceLocation[1]])

    if (newLocation != currentPiece.pieceLocation) {
      setCurrentPiece(piece => {
        piece.pieceLocation = newLocation
        return {...piece}
      })
    }
  }

  function movePieceRight (amount) {
    let newLocation = getPathFindPiece([1,0], [currentPiece.pieceLocation[0] + amount, currentPiece.pieceLocation[1]])

    if (newLocation != currentPiece.pieceLocation) {
      setCurrentPiece(piece => {
        piece.pieceLocation = newLocation
        return {...piece}
      })
    }
  }

  function getPathFindPiece(incrementor, desiredLocation) {
    let newLocation = currentPiece.pieceLocation;
    
    while(isPieceMoveValid([newLocation[0] + incrementor[0], newLocation[1] + incrementor[1]]) && (desiredLocation[0] != newLocation[0] || desiredLocation[1] != newLocation[1])) {
      newLocation = [newLocation[0] + incrementor[0], newLocation[1] + incrementor[1]]
    }

    return newLocation
  }

  function getPathFindPieceWithRotation(incrementor, desiredLocation, rotation) {
    let newLocation = currentPiece.pieceLocation;
    
    while(isPieceMoveValidWithRotation([newLocation[0] + incrementor[0], newLocation[1] + incrementor[1]], rotation) && (desiredLocation[0] != newLocation[0] || desiredLocation[1] != newLocation[1])) {
      newLocation = [newLocation[0] + incrementor[0], newLocation[1] + incrementor[1]]
    }

    return newLocation
  }

  function isPieceMoveValid(location) {
    let tileLocations = getTileLocationsFromPieceAndRotations(currentPiece.pieceType, currentPiece.pieceRotation)
    for(let i = 0; i < 4; i++) {
      if (locationOutOfBound([tileLocations[i][0] + location[0] , tileLocations[i][1] + location[1]]) || board[location[1] + tileLocations[i][1]][location[0] + tileLocations[i][0]] !== "") {
        return false
      }
    }
    return true
  }

  function isPieceMoveValidWithRotation(location, rotation) {
    let tileLocations = getTileLocationsFromPieceAndRotations(currentPiece.pieceType, rotation)
    for(let i = 0; i < 4; i++) {
      if (locationOutOfBound([tileLocations[i][0] + location[0] , tileLocations[i][1] + location[1]]) || board[location[1] + tileLocations[i][1]][location[0] + tileLocations[i][0]] !== "") {
        return false
      }
    }
    return true
  }

  function locationOutOfBound(location) {
    return (location[0] < 0 || location[1] < 0 || location[0] >= 10 || location[1] >= 20)
  }

  function onHoldPiece() {
    if (currentHeldPiece.hasHeldPiece)
      return

    if (currentHeldPiece.pieceType == "") {      
      setCurrentHeldPiece({pieceType: currentPiece.pieceType, hasHeldPiece: true});
      setCurrentPiece({pieceType: queue[0], pieceLocation: [getPieceStartingXLocationFromPieceType(queue[0]),0], pieceRotation: 0});
      popPiece();
    } else {
      let heldPiece =  currentHeldPiece.pieceType;
      setCurrentHeldPiece({pieceType: currentPiece.pieceType, hasHeldPiece: true});
      setCurrentPiece({pieceType: heldPiece, pieceLocation: [getPieceStartingXLocationFromPieceType(heldPiece),0], pieceRotation: 0});
    }
  }

  const EMPTY_ROW = ["", "", "", "", "", "", "", "", "", ""]

  function onHandlePlacePiece() {
    let placePieceLocation = getPathFindPiece([0, 1], [currentPiece.pieceLocation[0], 20])
    
    let tileLocations = getTileLocationsFromPieceAndRotations(currentPiece.pieceType, currentPiece.pieceRotation)
    
    setCurrentPiece({pieceType: queue[0], pieceLocation: [getPieceStartingXLocationFromPieceType(queue[0]),0], pieceRotation: 0})
    setCurrentHeldPiece({...currentHeldPiece, hasHeldPiece: false})
    popPiece()
    setBoard(board => {
      for (let i = 0; i < 4; i++) {
        board[tileLocations[i][1] + placePieceLocation[1]][tileLocations[i][0] + placePieceLocation[0]] = currentPiece.pieceType;
      }

      let removedYLocations = new Set()
      for (let i = 0; i < 4; i++) {
        let yLocationToCheck = tileLocations[i][1] + placePieceLocation[1]
        console.log(yLocationToCheck, board[yLocationToCheck])
        if (isRowFull(board[yLocationToCheck])) {
          removedYLocations.add(yLocationToCheck)
        }
      }

      let newBoard = []
      for (let row = 0; row < 20; row++) {
        if (removedYLocations.has(row)) {
          newBoard.unshift([...EMPTY_ROW])
        } else {
          newBoard.push(board[row])
          //onsole.log(board[row])
        }
      }
      console.log(removedYLocations)

      return newBoard
    })
  }

  function onSoftDropHandler() {
    let softDropLocation = getPathFindPiece([0, 1], [currentPiece.pieceLocation[0], 20])
    setCurrentPiece({...currentPiece, pieceLocation: softDropLocation})
  }

  function isRowFull (row) {
    for (let tile of row) {
      if (tile === "")
        return false
    }
    return true
  }
  
  return <React.Fragment>
      <KeyListener onHoldPieceHandler={onHoldPiece} onSoftDropHandler={onSoftDropHandler} onDasDisable ={onDasDisable} onMovePieceLeftHandler={onMovePieceLeftHandler} onMovePieceRightHandler={onMovePieceRightHandler} onHardDropHandler={onHandlePlacePiece} onRotatePieceHandler={onHandleRotatePiece}>
        <Piece location={currentPiece.pieceLocation} tileDimensions={{height: 20, width: 20}} texture={getTextureFromBoardStateTile(currentPiece.pieceType)} pieceType={currentPiece.pieceType} rotation={currentPiece.pieceRotation}/>
        <Board width={width} height={height} boardState={board}/>
        <PieceQueue queue={queue}/>
      </KeyListener>
      <div>{JSON.stringify(currentHeldPiece)}</div>
      <div>{JSON.stringify(currentPiece)}</div>
  </React.Fragment> 
}
//<div>{JSON.stringify(actions)}</div>
//<div>{JSON.stringify(currentDAS)} </div>
//<div>{JSON.stringify(currentPiece)}</div>
export default Tetris;