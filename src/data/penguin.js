// External dependencies
import { randomDirection } from "../utils/helpers";

import { ACTIVITY_DEAD, ACTIVITY_FLEE, ACTIVITY_BUILDING, ACTIVITY_EATING, ACTIVITY_NONE, ACTIVITY_MOVING, ACTIVITY_CLEANING, ACTIVITY_FISHING, ACTIVITY_GETING, ACTIVITY_LOVING, DIRECTION_NONE, ACTIVITY_NAMES, DIRECTION_DOWN, DIRECTION_UP,DIRECTION_LEFT,DIRECTION_RIGHT } from "../utils/constants";

// Class Implementation
export default class Penguin {
    constructor(
        id,
        key,
        vpos,
        hpos,
        alive,
        age,
        deadAge,
        hunger,
        temp,
        gender,
        genderName,
        name,
        shape,
        activity,
        activityTime,
        activityTarget,
        targetVPos,
        targetHPos,
        activityVPos,
        activityHPos,
        activityDirection,
        activityText, 
        hasFish,
        hasGem,
        isChild,
        isOld,
        canLove,
        inLove,
        loveTime,
        hasShowel,
        showelCnt,
        commands) {
            this.id = id
            this.key = key
            this.vpos = vpos
            this.hpos = hpos
            this.alive = alive
            this.age = age
            this.deadAge = deadAge
            this.hunger = hunger
            this.temp = temp
            this.gender = gender
            this.genderName = genderName
            this.name = name
            this.shape = shape
            this.activity = activity
            this.activityTime = activityTime
            this.activityTarget = activityTarget
            this.targetVPos = targetVPos
            this.targetHPos = targetHPos
            this.activityVPos = activityVPos
            this.activityHPos = activityHPos
            this.activityDirection = activityDirection
            this.activityText = activityText
            this.hasFish = hasFish
            this.hasGem = hasGem
            this.isChild = isChild
            this.isOld = isOld
            this.canLove = canLove
            this.inLove = inLove
            this.loveTime = loveTime
            this.hasShowel = hasShowel
            this.showelCnt = showelCnt
            this.commands = commands
    }

    //
    // makes the penguin move && become older
    // age, temperature && hunger increase faster if the evolution_speed raises
    // 
    becomeOlder = (cellsPos, size, penguinsPos, newpenguins, fishesPos, gemsPos, garbagesPos, weather, evolution_speed, changeAge = true) => {
    
        //  check if there is a neighbour
        const hasNeighbour = penguinsPos[(this.vpos + 1) * 100 + this.hpos] || penguinsPos[(this.vpos - 1) * 100 + this.hpos] || penguinsPos[this.vpos * 100 + this.hpos - 1] || penguinsPos[this.vpos * 100 + this.hpos + 1]
        let hasChild = false
    
        if (this.activityTime > 0) {
    
            // console.log(">>>>>>>>>>>>> In Penguin Become Older, time: " + this.activityTime + "  activity " + this.activity)
    
            this.activityTime -= 1
            if (this.activityTime === 0) {
                if (this.activity === ACTIVITY_MOVING || this.activity === ACTIVITY_FLEE) {
                    this.activity = ACTIVITY_NONE
                    this.activityDirection = DIRECTION_NONE
                } else if (this.activity === ACTIVITY_FISHING) {
                    this.hasFish = true
                    this.activity = ACTIVITY_NONE
                    this.activityDirection = DIRECTION_NONE
                    fishesPos[this.activityTarget].alive = false
                } else if (this.activity === ACTIVITY_GETING) {
                    this.hasGem = true
                    this.activity = ACTIVITY_NONE
                    this.activityDirection = DIRECTION_NONE
                    if (gemsPos[this.activityTarget]) {
                        gemsPos[this.activityTarget].isTaken = true
                        if (gemsPos[this.activityTarget].hasShowel) {
                            this.hasShowel = true
                            this.showelCnt = 2
                            gemsPos[this.activityTarget].hasShowel = false
                        }
                    }
                } else if (this.activity === ACTIVITY_CLEANING) {
                    this.activity = ACTIVITY_NONE
                    this.activityDirection = DIRECTION_NONE
                    if (garbagesPos[this.activityTarget]) {
                        garbagesPos[this.activityTarget].isTaken = true
                    }
                    this.showelCnt -= 1
                    this.hasShowel = this.showelCnt > 0
                } else if (this.activity === ACTIVITY_EATING) {
                    this.hunger = 0
                    this.hasFish = false
                    this.activity = ACTIVITY_NONE
                    this.activityDirection = DIRECTION_NONE
                } else if (this.activity === ACTIVITY_LOVING) {
                    this.temp = 0
                    this.hunger = 0
                    hasChild = this.inLove
                    this.inLove = false
                    this.activity = ACTIVITY_NONE
                    this.activityDirection = DIRECTION_NONE
                } else if (this.hasGem && this.activity === ACTIVITY_BUILDING) {
                    this.temp = 0
                    this.hasGem = false
                    cellsPos[this.activityVPos * 100 + this.activityHPos].type = 10
                    cellsPos[this.activityVPos * 100 + this.activityHPos].beingBuilt = false
                    this.activity = ACTIVITY_NONE
                    this.activityDirection = DIRECTION_NONE
                }
    
                this.activityText = ACTIVITY_NAMES[this.activity]
    
            }
        }
        if (this.alive) {
    
            if (changeAge) {
                if (this.loveTime > 0) {
                    this.loveTime -= 1
                } else {
                    this.canLove = true
                }
    
                if (this.isChild || this.isOld) {
                    this.age += 0.2
                } else {
                    this.age += 0.05
                }
    
                this.isChild = this.age <= 3
                this.isOld = this.age > 13
    
                if (!hasNeighbour) {
                    this.temp += weather / (6 - evolution_speed)
                }
                this.hunger += (this.shape + 1) / (6 - evolution_speed)
    
                // Is the penguin dead ?
                if (this.age > 20) {
                    this.alive = false
                    this.activity = ACTIVITY_DEAD
                    this.activityText = 'Died (age)'
                    return false
                } else if (this.temp > 99) {
                    this.alive = false
                    this.activity = ACTIVITY_DEAD
                    this.activityText = 'Died (cold)'
                    return false
                } else if (this.hunger > 99) {
                    this.alive = false
                    this.activity = ACTIVITY_DEAD
                    this.activityText = 'Died (hunger)'
                    return false
                } else if (cellsPos[this.vpos * 100 + this.hpos].type === 0) {
                    this.alive = false
                    this.activity = ACTIVITY_DEAD
                    this.activityText = 'Died (sunk)'
                    return false
                }
            }
            // if force:
            // this.executeCommand(cellsPos, size, penguinsPos, newpenguins, fishesPos, gemsPos, garbagesPos)
    
            // if alive && if the penguin is on smelting ice: try to escape
            if (cellsPos[this.vpos * 100 + this.hpos] < 3) {
                const direction = randomDirection(this.vpos, this.hpos)
                const coord = direction.vpos * 100 + direction.hpos
                if (direction.vpos > 0 && direction.vpos < size && direction.hpos > 0 && direction.hpos < size
                    && cellsPos[direction.vpos * 100 + direction.hpos].type > cellsPos[this.vpos * 100 + this.hpos].type
                    && !penguinsPos[coord] && !newpenguins[coord]) {
    
                    this.vpos = direction.vpos
                    this.hpos = direction.hpos
                    this.activity = ACTIVITY_FLEE
                    this.activityTime = 1
                    this.activityDirection = direction.direction
    
                }
            }
        } else {
            this.deadAge += 1
        }
        return hasChild
    
    }
    
    executeCommand = async (vpos, hpos, cellsPos, penguinsPos, fishesPos, gemsPos, garbagesPos) => {
    
        const deepDebug = true

        let direction = DIRECTION_NONE

        if (vpos < this.vpos) {
            direction = DIRECTION_UP
        } else if (vpos > this.vpos) {
            direction = DIRECTION_DOWN
        } else {
            if (hpos < this.hpos) {
                direction = DIRECTION_LEFT
            } else {
                direction = DIRECTION_RIGHT
            }
        }

        const coord = vpos * 100 + hpos

        if (deepDebug) {
            console.log("================= COMMAND =============" + vpos + " " + hpos + " " + coord + " " + direction)
            console.dir(fishesPos)
            console.log("================= COMMAND =============")
        }


        if (fishesPos[coord] && ! fishesPos[coord].onHook) {                
            fishesPos[coord].onHook = true
            this.activityTime = 3
            this.activity = ACTIVITY_FISHING
            this.activityTarget = coord
            this.activityDirection = direction
            console.log("there is a fish")
        } else if ( gemsPos[coord]) {
            this.activityTime = 3
            this.activity = ACTIVITY_GETING
            this.activityTarget = coord
            this.activityDirection = direction
            console.log("There is a gem")               
        } else if (garbagesPos[coord] && !this.isChild && !this.isOld && this.hasShowel) {
            this.activityTime = 2
            this.activity = ACTIVITY_CLEANING
            this.activityTarget = coord
            this.activityDirection = direction 
            console.log("There is a garbage")  
        } else if (cellsPos[coord].isSea() && this.hasGem && !this.isChild && !this.isOld) {
            this.activityTime = 3
            this.activityVPos = vpos
            this.activityHPos = hpos
            cellsPos[this.activityVPos * 100 + this.activityHPos].type = 4
            cellsPos[this.activityVPos * 100 + this.activityHPos].beingBuilt = true
            this.activity = ACTIVITY_BUILDING
            this.activityDirection = direction
            console.log("Let's build ")
        } else if (penguinsPos[coord] && !this.isChild && !this.isOld && !penguinsPos[coord].isChild && !penguinsPos[coord].isOld) {
            penguinsPos[coord].activityTime = 3
            penguinsPos[coord].loveTime = 10
            penguinsPos[coord].canLove = false
            penguinsPos[coord].inLove = true
            penguinsPos[coord].activity = ACTIVITY_LOVING
            this.loveTime = 10
            this.canLove = false
            this.inLove = true
            this.activityTime = 3
            this.activity = ACTIVITY_LOVING
            this.activityTarget = coord
            this.activityDirection = direction
        } else if (cellsPos[coord].isGround() ) { // && ! penguinsPos[coord]) {
            this.vpos = vpos
            this.hpos = hpos
            this.activity = ACTIVITY_MOVING
            this.activityDirection = direction
            this.activityTime = 1
            console.log("Let's move ")
        } else {
            this.activity = ACTIVITY_NONE
            this.activityDirection = DIRECTION_NONE
        }

        this.activityText = ACTIVITY_NAMES[this.activity]
            
    }

    eat = async() =>{

        console.log("Helleuh")
      
        if (this.hasFish) {
            this.activityTime = 2
            this.activity = ACTIVITY_EATING
            this.activityDirection = DIRECTION_NONE
            this.activityText = "Going to eat "
        } 
    }
}