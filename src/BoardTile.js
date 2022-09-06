import React from "react"

const BoardTile = ({tileDimensions, texture}) => {
    return <img className="noSelect" src={texture} height={tileDimensions.height} width={tileDimensions.width}/>
}

export default BoardTile 