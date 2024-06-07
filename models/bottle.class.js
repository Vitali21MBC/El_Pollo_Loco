class Bottle extends MovableObject {
    x;
    y = 350;
    width = 75;
    height = 75;
    randomNumber = 0;
    offset = {
        top: 10,
        bottom: 0,
        left: 25,
        right: 20
    };


    /**
    * Creates a new Bottle instance.
    * 
    * @param {number} x - The initial x position of the bottle (relative to the enemy throwing it).
    */
    constructor(x) {
        super();
        this.createRandomNumber();
        this.x = x + 700 + Math.random() * 700;
        if (this.randomNumber < 350) {
            this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        } else {
            this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        }
    }

    /**
    * Generates a random number between 0 and 700 (inclusive).
    */
    createRandomNumber() {
        this.randomNumber = Math.random() * 700;
    }
}

