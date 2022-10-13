import LTile from "./LTile.png";
import JTile from "./JTile.png";
import ZTile from "./ZTile.png";
import STile from "./STile.png";
import ITile from "./ITile.png";
import TTile from "./TTile.png";
import OTile from "./OTile.png";
import DefaultTile from "./DefaultTile.png"

function getTextureFromBoardStateTile(boardTile) {
    let tile;

    switch (boardTile) {
        case "T":
            tile = TTile
            break;
        case "I":
            tile = ITile
            break;
        case "J":
            tile = JTile
            break;
        case "L":
            tile = LTile
            break;
        case "S":
            tile = STile
            break;
        case "Z":
            tile = ZTile
            break;
        case "O":
            tile = OTile
            break;
        default:
            tile = DefaultTile
            break;
    }
    return tile
}

export {
    LTile,
    JTile,
    ZTile,
    STile,
    ITile,
    TTile,
    OTile,
    DefaultTile,
    getTextureFromBoardStateTile
}