
//I PIECE

// X X X X
// O O O O
// X X X X
// X X X X

const IPIECE_0DEG = [[0, 1], [1,1], [2,1], [3,1]]

// X X O X
// X X O X
// X X O X
// X X O X

const IPIECE_90DEG = [[2, 0], [2, 1], [2, 2], [2, 3]]

// X X X X
// X X X X
// O O O O
// X X X X

const IPIECE_180DEG = [[0, 2], [1, 2], [2, 2], [3, 2]]

// X O X X
// X O X X
// X O X X
// X O X X

const IPIECE_270DEG = [[1, 0], [1, 1], [1, 2], [1, 3]]


// J PIECE

// O X X
// O O O
// X X X
const JPIECE_0DEG = [[0, 0], [0, 1], [1, 1], [2, 1]]

// X O X
// X O X
// O O X
const JPIECE_90DEG = [[0, 2], [1, 2], [1, 1], [1, 0]]

// X X X
// O O O
// X X O
const JPIECE_180DEG = [[0, 1], [1, 1], [2, 1], [2, 2]]

// X O O
// X O X
// X O X
const JPIECE_270DEG = [[1, 0], [2, 0], [1, 1], [1, 2]]


// L PIECE

// X X O
// O O O
// X X X
const LPIECE_0DEG = [[2, 0], [0, 1], [1, 1], [2, 1]]
// X O X
// X O X
// X O O

const LPIECE_90DEG = [[2, 2], [1, 2], [1, 1], [1, 0]]

// X X X
// O O O
// O X X
const LPIECE_180DEG = [[0, 1], [1, 1], [2, 1], [0, 2]]

// O O X
// X O X
// X O X
const LPIECE_270DEG = [[1, 0], [0, 0], [1, 1], [1, 2]]


// O PIECE
// This is the only piece without rotations

// O O
// O O
const OPIECE = [[0, 0], [0, 1], [1, 1], [1, 0]]


// S PIECE

// X O O
// O O X
// X X X
const SPIECE_0DEG = [[1, 0], [2, 0], [0, 1], [1, 1]]

// X O X
// X O O
// X X O
const SPIECE_90DEG = [[1, 0], [1, 1], [2, 1], [2, 2]]

// X X X
// X O O
// O O X
const SPIECE_180DEG = [[0, 2], [1, 2], [1, 1], [2, 1]]

// O X X
// O O X
// X O X
const SPIECE_270DEG = [[0, 0], [0, 1], [1, 1], [1, 2]]


// T PIECE

// X O X
// O O O
// X X X
const TPIECE_0DEG = [[0, 1], [1, 0], [1, 1], [2, 1]]

// X O X
// X O O
// X O X
const TPIECE_90DEG = [[1, 0], [1, 1], [2, 1], [1, 2]]

// X X X
// O O O
// X O X
const TPIECE_180DEG = [[0, 1], [1, 1], [2, 1], [1, 2]]

// X O X
// O O X
// X O X
const TPIECE_270DEG = [[1, 0], [0, 1], [1, 1], [1, 2]]


// S PIECE

// O O X
// X O O
// X X X
const ZPIECE_0DEG = [[0, 0], [2, 1], [1, 0], [1, 1]]

// X X O
// X O O
// X O X
const ZPIECE_90DEG = [[2, 0], [1, 1], [2, 1], [1, 2]]

// X X X
// O O X
// X O O
const ZPIECE_180DEG = [[0, 1], [1, 2], [1, 1], [2, 2]]

// X O X
// O O X
// O X X
const ZPIECE_270DEG = [[0, 1], [1, 0], [1, 1], [0, 2]]

const IPIECE = [IPIECE_0DEG, IPIECE_90DEG, IPIECE_180DEG, IPIECE_270DEG]
const JPIECE = [JPIECE_0DEG, JPIECE_90DEG, JPIECE_180DEG, JPIECE_270DEG]
const LPIECE = [LPIECE_0DEG, LPIECE_90DEG, LPIECE_180DEG, LPIECE_270DEG]
const SPIECE = [SPIECE_0DEG, SPIECE_90DEG, SPIECE_180DEG, SPIECE_270DEG]
const TPIECE = [TPIECE_0DEG, TPIECE_90DEG, TPIECE_180DEG, TPIECE_270DEG]
const ZPIECE = [ZPIECE_0DEG, ZPIECE_90DEG, ZPIECE_180DEG, ZPIECE_270DEG]

function getTileLocationsFromPieceAndRotations(pieceType, rotation) {
    switch (pieceType) {
        case "T":
            return TPIECE[rotation]
        case "J":
            return JPIECE[rotation]
        case "I":
            return IPIECE[rotation]
        case "Z":
            return ZPIECE[rotation]
        case "S":
            return SPIECE[rotation]
        case "L":
            return LPIECE[rotation]
        default:
            return OPIECE
    }
}

export {getTileLocationsFromPieceAndRotations}