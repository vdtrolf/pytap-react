// External dependencies
import { WEATHER_SUN, WEATHER_RAIN, WEATHER_SNOW } from "../utils/constants";


// Class Implementation
export default class Cell {
    constructor(
        id,
        key,
        vpos,
        hpos,
        type,
        beingBuilt) {
            this.id = id
            this.key = key
            this.vpos = vpos
            this.hpos = hpos
            this.type = type
            this.beingBuilt = beingBuilt    
        }

    isGround = () => {
        return this.type > 0
    }

    isSea = () => {
        return this.type === 0
    }

    becomeOlder = (cellsPos, size, weather, evolutionSpeed) => {
        let smeltFactor = 6 - evolutionSpeed
    
        if (this.vpos === 0 || cellsPos[(this.vpos - 1) * 100 + this.hpos].type > 0)
            smeltFactor += 1
        if (this.vpos === size - 1 || cellsPos[(this.vpos + 1) * 100 + this.hpos].type > 0)
            smeltFactor += 1
        if (this.hpos === 0 || cellsPos[this.vpos * 100 + this.hpos - 1].type > 0)
            smeltFactor += 1
        if (this.hpos === size - 1 || cellsPos[this.vpos * 100 + this.hpos + 1].type > 0)
            smeltFactor += 1
    
        if (weather === WEATHER_SUN && this.type > 0 && this.type < 12 && Math.floor(Math.random() * smeltFactor) === 0) {
            this.type -= 1
        } else if (weather === WEATHER_RAIN && this.type > 0 && this.type < 12 && Math.floor(Math.random() * smeltFactor * 2) === 0) {
            this.type -= 1
        } else if (weather === WEATHER_SNOW && this.type > 0 && this.type < 11 && Math.floor(Math.random() * (2 + evolutionSpeed / 2)) === 0) {
            this.type += 1
        }
    
        if (this.beingBuilt && this.type < 12) {
            this.type += 2
        }
    }

}
