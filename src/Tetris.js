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
    console.log(queue)
    let newQueue = [...queue];
    
    newQueue = newQueue.concat(generateBag())
    newQueue = newQueue.concat(generateBag())
    console.log("newqueue", newQueue)
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
    console.log("QUEUE", queue)

    if (generatePieceQueue && queue.length <= 14 ) {
      newQueue.concat(generateBag())
    }

    setQueue(newQueue);
    return nextPiece;
  }
  function rotatePiece(rotation) {
    var currentTime = +new Date(); 
    setCurrentPiece(piece => {
      piece.pieceRotation = (piece.pieceRotation + rotation) %4
      
      return {...piece}
    })

    //console.log(+new Date() - currentTime)
  }

  function onMovePieceHandler(moveLocation) {
    if (moveLocation[0] < 0) {
      onMovePieceLeftHandler(moveLocation) 
    } else {
      onMovePieceRightHandler(moveLocation)
    }
  }

  function onMovePieceLeftHandler (moveLocation) {
    let newLocation = currentPiece.pieceLocation
    let desiredXLocation = moveLocation[0] + currentPiece.pieceLocation[0];
    
    while(isPieceMoveValid([newLocation[0] - 1, newLocation[1]]) && desiredXLocation != newLocation[0]) {
      newLocation = [newLocation[0] - 1, newLocation[1]]
    }

    if (newLocation != currentPiece.pieceLocation) {
      setCurrentPiece(piece => {
        piece.pieceLocation = newLocation
        return {...piece}
      })
    }
  }

  function onMovePieceRightHandler (moveLocation) {
    let newLocation = currentPiece.pieceLocation
    let desiredXLocation = moveLocation[0] + currentPiece.pieceLocation[0];
    
    while(isPieceMoveValid([newLocation[0] + 1, newLocation[1]]) && desiredXLocation != newLocation[0]) {
      newLocation = [newLocation[0] + 1, newLocation[1]]
    }

    if (newLocation != currentPiece.pieceLocation) {
      setCurrentPiece(piece => {
        piece.pieceLocation = newLocation
        return {...piece}
      })
    }
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

  function locationOutOfBound(location) {
    return (location[0] < 0 || location[1] < 0 || location[0] >= 10 || location[1] >= 20)
  }

  function placePiece() {
    let currentYPos = currentPiece.pieceLocation[1];
    let tileLocations = getTileLocationsFromPieceAndRotations(currentPiece.pieceType, currentPiece.pieceRotation);
    let placePieceLocation = null;

    while (currentYPos < 20) {
      if (placePieceLocation != null) {
        break;
      }
      for (let i = 0; i < 4; i++) {
        if (currentYPos + tileLocations[i][1] >= 20) { 
          placePieceLocation = [currentPiece.pieceLocation[0], currentYPos - 1]
          break;
        } 
        if (board[currentYPos + tileLocations[i][1]][currentPiece.pieceLocation[0] + tileLocations[i][0]] != "") {
          placePieceLocation = [currentPiece.pieceLocation[0], currentYPos - 1]
          break;
        }
      }

      currentYPos += 1;
    }
    
    if (pieceMoveIsValid(placePieceLocation))
      setBoard(board => {
        for (let i = 0; i < 4; i++) {
          board[tileLocations[i][1] + placePieceLocation[1]][tileLocations[i][0] + placePieceLocation[0]] = currentPiece.pieceType;
        }
        return [...board]
      })
  }
  
  return <React.Fragment>
      <KeyListener onMovePieceHandler={onMovePieceHandler}>
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