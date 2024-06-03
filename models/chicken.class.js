class Chicken extends MovableObject {
    energy = 5;
    y = 350;
    width = 60;
    isChickenDead = false;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    chicken_dead_sound = new Audio('../audio/chicken_dying.mp3');


    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];



    constructor(x) {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.chicken_dead_sound.volume = 0.06;
        // this.x = 300 + Math.random() * 4000;
        this.x = x;
        this.speed = 0.15 + Math.random() * 0.25;
        this.height = 80 + Math.random() * 20;
        this.y = this.y - (this.height - 80);
        this.animate();
    }

    animate() {
        // Bewegung und Animation des Huhns, solange es nicht tot ist
        setInterval(() => {
            if (!this.isChickenDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isChickenDead) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.loadImage(this.IMAGES_DEAD);
            }
        }, 250);

        // Überprüfen, ob das Huhn verletzt ist
        setInterval(() => {
            if (this.isHurt() && !this.isChickenDead) {
                this.isChickenDead = true;
                this.chicken_dead_sound.play();
                this.loadImage(this.IMAGES_DEAD[0]);
                console.log('Chicken is dead?', this.isChickenDead);
            }
        }, 50);
    }


}