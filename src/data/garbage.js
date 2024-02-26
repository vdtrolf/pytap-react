// External dependencies

// Class Implementation
export default class Garbage {
    constructor(
        id,
        key,
        vpos,
        hpos,
        kind,
        isTaken) {
            this.id = id
            this.key = key
            this.vpos = vpos
            this.hpos = hpos
            this.kind = kind
            this.isTaken = isTaken
        }

    becomeOlder = () => {
        if (Math.floor(Math.random() * 30) === 0) {
            this.kind = Math.floor(Math.random() * 4)
        }
    }
}