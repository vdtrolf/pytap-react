import {
    DIRECTION_NONE,
    ACTIVITY_BUILDING, ACTIVITY_MOVING, ACTIVITY_CLEANING, ACTIVITY_FISHING, ACTIVITY_GETING, ACTIVITY_NONE, ACTIVITY_EATING,
    MOVES, ACTIVITY_NAMES, DIRECTION_NAMES, COMMAND_NONE, COMMAND_EATING
} from "./constants";


 //Returns a direction based on an order - in the form of vpos/hpos coords//
export const getDirection = (commandDirection, activity) => {
   
    console.log(">>>>>>>>>>>>>>>>> COMMAND  => " + commandDirection)
    console.log(">>>>>>>>>>>>>>>>> ACTIVITY => " + activity)

    if (commandDirection !== DIRECTION_NONE) {
        const move = MOVES[commandDirection]
        return {
            'activity': activity,
            'activityName': ACTIVITY_NAMES[activity],
            'directionNum': commandDirection,
            'vmove': move[0],
            'hmove': move[1],
            'directionName': DIRECTION_NAMES[commandDirection]
        }
    } 
}

export const findItem = (vpos, hpos, items) => {
    // //
    for (let direction = 0; direction < 4; direction++) {
        const coord = (vpos + MOVES[direction][0]) * 100 + hpos + MOVES[direction][1]
        if (items[coord])
            return direction
    }
    return -1
}


export const interpretCommands = (commandType, commandDirection, vpos, hpos, cellsPos, fishesPos, gemsPos, garbagesPos) => {


    // console.log("============ GARBAGESPOS IN INTERPRETER >>>> ")
    // console.dir(garbagesPos)
    // console.log("============ GARBAGESPOS IN INTERPRETER >>>> ")
    

    //returns the given activity as a CONSTANT value//

    if (commandType && commandType !== COMMAND_NONE) {
        if (commandType === COMMAND_EATING) {
            return {
                'activity': ACTIVITY_EATING,
                'activityName': ACTIVITY_NAMES[ACTIVITY_EATING],
                'vmove': 0,
                'hmove': 0,
                'directionName': '',
                'directionNum': DIRECTION_NONE
            }
        } else {
            const direction = getDirection(commandDirection, ACTIVITY_MOVING)

            if (fishesPos[(vpos + direction.vmove) * 100 + hpos + direction.hmove]) {
                direction.activity = ACTIVITY_FISHING
                direction.activityName = ACTIVITY_NAMES[ACTIVITY_FISHING]
            } else if (gemsPos[(vpos + direction.vmove) * 100 + hpos + direction.hmove]) {
                direction.activity = ACTIVITY_GETING
                direction.activityName = ACTIVITY_NAMES[ACTIVITY_GETING]
            } else if (garbagesPos[(vpos + direction.vmove) * 100 + hpos + direction.hmove]) {
                direction.activity = ACTIVITY_CLEANING
                direction.activityName = ACTIVITY_NAMES[ACTIVITY_CLEANING]
            } else if (cellsPos[(vpos + direction.vmove) * 100 + hpos + direction.hmove].type === 0) {
                direction.activity = ACTIVITY_BUILDING
                direction.activityName = ACTIVITY_NAMES[ACTIVITY_BUILDING]
            }

            console.dir(direction)

            return direction
        }

    } 
    return {
        'activity': ACTIVITY_NONE,
        'activityName': '',
        'vmove': 0,
        'hmove': 0,
        'directionName': '',
        'directionNum': DIRECTION_NONE
    }
}