// External dependencies
import Gem from "./gem";
import Garbage from "./garbage";
import Fish from "./fish";

import { randomWeather,getUniqueKey } from "../utils/helpers";

import { PREFIX_FISH, PREFIX_GARBAGE, PREFIX_GEM } from "../utils/constants";

// Class Implementation
export default class Island {
    constructor(
         id,
         key,
         size,
         difficulty,
         name,
         counter,
         weather,
         weatherAge,
         year,
         points,
         platicControl,
         running,
         evolutionSpeed,
         onGoing,
         penguins,
         fishes,
         gems,
         garbages,
         cells) {
            this.id = id
            this.key = key
            this.size = size
            this.difficulty = difficulty
            this.name = name
            this.counter = counter
            this.weather = weather
            this.weatherAge = weatherAge
            this.year = year
            this.points = points
            this.platicControl = platicControl
            this.running = running
            this.evolutionSpeed = evolutionSpeed
            this.onGoing = onGoing
            this.penguins = penguins
            this.fishes = fishes
            this.gems = gems
            this.garbages = garbages
            this.cells = cells
        }

    #populatePenguins = () => {
        let penguinsPos = {};
        this.penguins.forEach(penguin => {
            penguinsPos[penguin.vpos * 100 + penguin.hpos] = penguin
        });
        return penguinsPos
    }
    
    #populateCells = () => {
        const cellsPos = {}
        this.cells.forEach(cell => {
            cellsPos[cell.vpos * 100 + cell.hpos] = cell
        });
        return cellsPos 
    }
    
    #populateFishes = () => {
        const fishesPos = {};
        this.fishes.forEach(function(item, index, object) {
            if (item.alive) {
                object.splice(index, 1);
            }
        });
        return fishesPos
    }
   
    #populateGarbages = () => {
        const garbagesPos = {};
        this.garbages.forEach(function(item, index, object) {
            if (item.isTaken) {
                object.splice(index, 1);
            } else {
                garbagesPos[item.vpos * 100 + item.hpos] = item
            }
        });
        return garbagesPos
    }
    
    #populateGems = () => {
        const gemsPos = {};
        this.gems.forEach(function(item, index, object) {
            if (item.isTaken || item.age < 1) {
                object.splice(index, 1);
            } else {
                gemsPos[item.vpos * 100 + item.hpos] = item
            }
        });
        return gemsPos
    }
    
    transmitCommands = (penguin, commandType, commandDirection) => {

        console.log("============= TRANSMIT ============== " + commandType + " " + commandDirection)
          
        penguin.executeCommand( commandType, 
            commandDirection,
            this.#populateCells(),
            this.size, 
            this.#populatePenguins(),
            this.#populatePenguins(), 
            this.#populateFishes(), 
            this.#populateGems(), 
            this.#populateGarbages())

        return this
    }
       
    becomeOlder = () => {
    
        const deepDebug = false
        let penguinsPos = this.#populatePenguins()
        const fishesPos = this.#populateFishes()
        const garbagesPos = this.#populateGarbages()
        const cellsPos = this.#populateCells()
        const gemsPos = this.#populateGems()
    
        if (this.onGoing) {
            this.counter += 1
            this.evolutionSpeed = Math.floor(this.counter / 40) + 1
            if (this.evolutionSpeed > 5)
                this.evolutionSpeed = 5

            this.year += 0.05
    
            const weather = randomWeather(this.year, this.weather, this.weatherAge)
            this.weather = weather[0]
            this.weatherAge = weather[1]
    
            //  cells become_older, notably to make them smelt over time
            this.cells.forEach(cell => {
                cell.becomeOlder(cellsPos, this.size, this.weather, this.evolutionSpeed)
            })
            
            this.fishes.forEach(fish => {
                if (true) { // fish.alive) {
                    const move = fish.becomeOlder(cellsPos, fishesPos, garbagesPos, this.size)
                    fish.vpos = move.vpos
                    fish.hpos = move.hpos
                    fish.direction = move.direction
                    fish.lastDirection = move.direction
                    fishesPos[move.vpos * 100 + move.hpos] = fish
                }
            })
    
            // add some fishes
            let cntFishes = this.fishes.length
            let tryCounter = 0
            while (cntFishes < this.size / 2 && tryCounter < 10) {
                const v = Math.floor(Math.random() * (this.size - 1))
                const h = Math.floor(Math.random() * (this.size - 1))
    
                if (cellsPos[v * 100 + h].type === 0 && !fishesPos[v * 100 + h] && !garbagesPos[v * 100 + h]) {
                    const uniqueKey = getUniqueKey(PREFIX_FISH)
                    const fish = new Fish(1, uniqueKey, v, h);
                    this.fishes.push(fish)
                    fishesPos[v * 100 + h] = fish;
                    cntFishes += 1
                }
                tryCounter += 1
            }
    
            // garbage becomes older, notably change type
            this.garbages.forEach(garbage => {
                garbage.becomeOlder()
            })
    
            // add some extra garbage - must be next another garbage
            // gets more chances to happen if the evolution speed raises
            if (this.evolutionSpeed > 0) {
                for (let i = 0; i < this.evolutionSpeed; i++) {
                    const v = Math.floor(Math.random() * (this.size))
                    const h = Math.floor(Math.random() * (this.size))
    
                    //console.log("=============> GARBAGE 1 " + v + " " + h)
    
                    if (cellsPos[v * 100 + h].type === 0 && !fishesPos[v * 100 + h] && !garbagesPos[v * 100 + h]
                        && (garbagesPos[(v + 1) * 100 + h] || garbagesPos[(v - 1) * 100 + h] || garbagesPos[v * 100 + h + 1] || garbagesPos[v * 100 + h - 1])) {
    
                        // console.log("=============> GARBAGE")
    
                        const uniqueKey = getUniqueKey(PREFIX_GARBAGE)
                        const garbage = new Garbage(1, uniqueKey, v, h);
                        this.garbages.push(garbage)
                        garbagesPos[v * 100 + h] = garbage
                    }
                }
    
                this.gems.forEach(gem => {
                    gem.becomeOlder()
                });
    
                // add some gems
                if (this.gems.length < this.size / 2 &&  Math.floor(Math.random() * 4) === 0) {
                    const v = Math.floor(Math.random() * (this.size - 1))
                    const h = Math.floor(Math.random() * (this.size - 1))
    
                    const hasShowel = Math.floor(Math.random() * 10) > 8
                    if (cellsPos[v * 100 + h].type > 0 && !penguinsPos[v * 100 + h] && !gemsPos[v * 100 + h]) {
                        const uniqueKey = getUniqueKey(PREFIX_GEM)
                        const gem = new Gem(1, uniqueKey, v, h, hasShowel,12,false);
                        this.gems.push(gem)
                        gemsPos[v * 100 + h] = gem
                    }
                }
    
    
                // penguins become_older, notably to make them older, execute commands and get childs
                const tmpPenguinsPos = {}
                this.penguins.forEach(penguin => {
                    // const hasChild = 
                    penguin.becomeOlder(cellsPos, this.size, penguinsPos, tmpPenguinsPos, fishesPos, gemsPos, garbagesPos, this.weather, this.evolutionSpeed)
                    if (penguin.alive || penguin.deadAge < 6) {
                        tmpPenguinsPos[penguin.vpos * 100 + penguin.hpos] = penguin
                    }
                    // if (hasChild) { 
                    //     counter = 0
                    //     while counter < 10:
                    //         v = random.randint(1,self.size-2)
                    //         h = random.randint(1,self.size-2)
                    //         if self.cells[v][h].isGround() and not self.penguins.get(v*100+h) and not self.gems.get(v*100+h):
                    //             tmppenguins[v*100+h]=Penguin(childCounter,v,h)
                    //             childCounter += 1
                    //             break
                    //         counter += 1   
                });
                penguinsPos = tmpPenguinsPos
    
            }
    
            if (deepDebug) {
                console.log("================ island =============")
                console.dir(this)
                console.log("================ island =============")
            }
    
        }
    
        return this
    
    }


}