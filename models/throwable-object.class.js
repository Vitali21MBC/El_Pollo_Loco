class ThrowableObject extends MovableObject {

    throwing_sound = new Audio('../audio/throw.mp3');

    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.throw();

        this.throwing_sound.volume = 0.3;
    }

    throw() {
        this.speedY = 30;
        this.throwing_sound.play();
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}