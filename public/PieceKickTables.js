let defaultKicktable = {
    0 : {
        1 : [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
        3 : [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]]
    },
    1 : {
        1 : [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
        3 : [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]]
    },
    2 : {
        1 : [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
        3 : [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]]
    },
    3 : {
        1 : [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
        3 : [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]]
    }
}

let t180KickTable = {
    0 : [[0, 0], [0, 1], [1, 1], [-1, 1], [1, 0], [-1, 0]],
    1 : [[0, 0], [1, 0], [1, 2], [1, 1], [0, 2], [0, 1]],
    2 : [[0, 0], [0, -1], [-1, -1], [1, -1], [-1, 0], [1, 0]],
    3 : [[0, 0], [-1, 0], [-1, 2], [-1, 1], [0, 2], [0, 1]]
}

let iKickTable = {
    0 : {
        1 : [[0, 0], [0, 1], [0, -2], [1, -2], [-2, 1]],
        3 : [[0, 0]]
    },
    1 : {
        1 : [[0, 0]],
        3 : [[0, 0]]
    },
    2 : {
        1 : [[0, 0]],
        3 : [[0, 0]]
    },
    3 : {
        1 : [[0, 0]],
        3 : [[0, 0]]
    }
}

function getTableFromPieceAndRotation(pieceType, currentRotation, rotation) {
    if (pieceType == "T" && rotation == 2 ) {
        return t180KickTable[currentRotation]
    } else if (pieceType == "O" || rotation == 2) {
        return [[0,0]]
    } else if (pieceType == "I") {
        return iKickTable[currentRotation][rotation]
    } else {
        return defaultKicktable[currentRotation][rotation]
    }
}

export {getTableFromPieceAndRotation}