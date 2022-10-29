import Board from "./Board"
import React, { useEffect } from "react"
import { useState, useRef } from "react"
import PieceQueue from "./PieceQueue";
import {getTextureFromBoardStateTile} from "../public/BoardTiles"
import Piece from "./Piece"
import { getTileLocationsFromPieceAndRotations } from "../public/PieceRotations";
import KeyListener from "./KeyListener";

const Tetris = ({width, height, startingBoardState, startingPieceQueue, generatePieceQueue}) => {
  const [currentPiece, setCurrentPiece] = useState({"pieceType": (startingPieceQueue.length == 0) ? null : startingPieceQueue[0], "pieceRotation": 0, "pieceLocation" : [getPieceStartingXLocationFromPieceType(startingPieceQueue[0], 0), 0] })
  const [board, setBoard] = useState(startingBoardState)
  const [queue, setQueue] = useState(startingPieceQueue.slice(1))
  console.log(currentDAS)
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

  function onMovePieceHandler(moveLocation) {
    let goalLocation = [moveLocation[0] + currentPiece.pieceLocation[0], moveLocation[1] + currentPiece.pieceLocation[1]]

    if (moveLocation[0] < 0) {
      movePieceLeft(goalLocation)
    } else {
      movePieceRight(goalLocation)
    }
  }

  const [currentDAS, setCurrentDAS] = useState({direction: null, timeout: null, enabled: false})

  let isLeftDas = currentDAS.direction == "left" && currentDAS.enabled
  let isRightDas = currentDAS.direction == "right" && currentDAS.enabled

  function onMovePieceRightHandler() {
    onMovePieceHandler([1,0])
    
    if (currentDAS.timeout != null) {
      setCurrentDAS(action => {
            clearTimeout(action.timeout)
            return {direction: null, timeout: null}
        })
    }
    let now = Date.now()

    setCurrentDAS({direction: "right", timeout: setTimeout(() => dasPieceRight(now), 100), start: new Date(), enabled: false})
  }

  function onMovePieceLeftHandler() {
      onMovePieceHandler([-1,0])
      if (currentDAS.timeout != null) {
        setCurrentDAS(action => {
              clearTimeout(action.timeout)
              return {direction: null, timeout: null}
          })
      }
      let now = Date.now()

      setCurrentDAS({direction: "left", timeout: setTimeout(() =>  dasPieceLeft(now), 100), enabled: false})
  }

  function dasPieceLeft(now) {
    onDasEnable()
    onMovePieceHandler([-10, 0])
    console.log(currentDAS)
  }

  function dasPieceRight(now) {
    onDasEnable()
    onMovePieceHandler([10, 0])
    console.log(currentDAS)
  }

  function onDasEnable() {
    setCurrentDAS(currentDAS =>{
      return {enabled: true, timeout: null, ...currentDAS}
    })
  }

  function onDasDisable(direction) {
    console.log("DISABLE", direction)
    if (direction == "left" && currentDAS.direction == "left")
      setCurrentDAS(dasAction => {
        if (dasAction.timeout)
          clearTimeout(dasAction.timeout)
        return {enabled: false, timeout: null, direction: null}})
    else if (direction == "right" && currentDAS.direction == "right")
      setCurrentDAS(dasAction => {
        if (dasAction.timeout)
          clearTimeout(dasAction.timeout)
        return {enabled: false, timeout: null, direction: null}})
  }

  function movePieceLeft (moveLocation) {
    let newLocation = getPathFindPiece([-1, 0], moveLocation)

    if (newLocation != currentPiece.pieceLocation) {
      setCurrentPiece(piece => {
        piece.pieceLocation = newLocation
        return {...piece}
      })
    }
  }

  function movePieceRight (moveLocation) {
    let newLocation = getPathFindPiece([1,0], moveLocation)

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

  function onHandlePlacePiece() {
    let placePieceLocation = getPathFindPiece([0, 1], [currentPiece.pieceLocation[0], 20])
    
    let tileLocations = getTileLocationsFromPieceAndRotations(currentPiece.pieceType, currentPiece.pieceRotation)
    
    setCurrentPiece({pieceType: queue[0], pieceLocation: [getPieceStartingXLocationFromPieceType(queue[0]),0], pieceRotation: 0})
    popPiece()
    setBoard(board => {
      for (let i = 0; i < 4; i++) {
        board[tileLocations[i][1] + placePieceLocation[1]][tileLocations[i][0] + placePieceLocation[0]] = currentPiece.pieceType;
      }
      return [...board]
    })
  }
  
  return <React.Fragment>
      <KeyListener onDasDisable ={onDasDisable} onMovePieceLeftHandler={onMovePieceLeftHandler} onMovePieceRightHandler={onMovePieceRightHandler} onHardDropHandler={onHandlePlacePiece} onRotatePieceHandler={onHandleRotatePiece}>
        <Piece location={currentPiece.pieceLocation} tileDimensions={{height: 20, width: 20}} texture={getTextureFromBoardStateTile(currentPiece.pieceType)} pieceType={currentPiece.pieceType} rotation={currentPiece.pieceRotation}/>
        <Board width={width} height={height} boardState={board}/>
        <PieceQueue queue={queue}/>
      </KeyListener>
      <div>{JSON.stringify(currentPiece)}</div>
  </React.Fragment> 
}
//<div>{JSON.stringify(actions)}</div>
//<div>{JSON.stringify(currentDAS)} </div>
//<div>{JSON.stringify(currentPiece)}</div>
export default Tetris;