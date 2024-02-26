// External dependencies

// Class Implementation
export default class Gem {
    constructor(
         id,
         key,
         vpos,
         hpos,
         hasShowel,
         age,
         isTaken) {
            this.id = id
            this.key = key
            this.vpos = vpos
            this.hpos = hpos
            this.hasShowel = hasShowel
            this.age = age
            this.isTaken = isTaken
          }

    becomeOlder = () => {
        if (this.age > 0) {
            this.age -= 1
        }
    }

}
