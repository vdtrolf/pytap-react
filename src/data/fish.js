import { FISH_LETARGY } from "../utils/constants";
import { randomDirection } from "../utils/helpers"

// Class Implementation
export default class Fish {
    constructor(
        id,
        key,
        vpos,
        hpos,
        alive,
        onHook,
        staying,
        direction,
        lastDirection) {
            this.id = id
            this.key = key
            this.vpos = vpos
            this.hpos = hpos
            this.alive = alive            
            this.onHook = onHook
            this.staying = staying
            this.direction = direction
            this.lastDirection = lastDirection
         }

    becomeOlder = (cellsPos, fishesPos, garbagesPos, size) => {

        // console.log("============== FISH GET OLDER ==========")

        if (!this.onHook) {
            const move = randomDirection(this.vpos, this.hpos)
        
            if (move.vpos >= 0 && move.vpos < size && move.hpos >= 0 && move.hpos < size && (move.vpos + move.hpos) > 0 ) {
                const cellType = cellsPos[move.vpos * 100 + move.hpos].type
                if (Math.floor(Math.random() * FISH_LETARGY) === 0
                    && cellType === 0
                    && !fishesPos[move.vpos * 100 + move.hpos]
                    && !garbagesPos[move.vpos * 100 + move.hpos]) {
                        this.vpos = move.vpos
                        this.hpos = move.hpos
                        this.direction = move.direction
                        this.lastDirection = move.direction
                }
            }
        }
    }

}
