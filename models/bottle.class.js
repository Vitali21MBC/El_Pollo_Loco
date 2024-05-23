class Bottle extends MovableObject {
    x;
    y = 350;
    width = 75;
    height = 75;
    randomNumber = 0;

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

    createRandomNumber(){
        this.randomNumber = Math.random() * 700;
    }
}

