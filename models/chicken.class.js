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
    chicken_dead_sound = new Audio('./audio/chicken_dying.mp3');

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
        this.setSoundVolumes();
        this.initializeProperties(x);
        this.animate();
    }

    setSoundVolumes() {
        this.chicken_dead_sound.volume = 0.06;
    }

    initializeProperties(x) {
        this.x = x;
        this.speed = 0.15 + Math.random() * 0.25;
        this.height = 80 + Math.random() * 20;
        this.y = this.y - (this.height - 80);
    }

    animate() {
        setInterval(() => {
            this.movingLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.walkingAnimation();
        }, 200);
        setInterval(() => {
            this.handleChickenDying();
        }, 50);
    }

    movingLeft() {
        if (!this.isChickenDead) {
            this.moveLeft();
        }
    }

    walkingAnimation() {
        if (!this.isChickenDead) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    handleChickenDying() {
        if (this.isHurt() && !this.isChickenDead) {
            this.isChickenDead = true;
            this.deadAnimation();
            this.playDeadChickenSound();
        }
    }

    deadAnimation() {
        this.loadImage(this.IMAGES_DEAD);
    }

    playDeadChickenSound() {
        if (audio) this.chicken_dead_sound.play();
    }
}