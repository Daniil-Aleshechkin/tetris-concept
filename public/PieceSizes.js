const getPieceSizesFromPieceType = (pieceType) => {
    switch (pieceType) {
        case "O":
            return 2
        case "I":
            return 4
        default:
            return 3
    }
}

export {getPieceSizesFromPieceType}