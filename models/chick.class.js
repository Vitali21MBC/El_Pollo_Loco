class Chick extends MovableObject {
    energy = 5;
    y = 370;
    width = 60;
    isChickenDead = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    chicken_dead_sound = new Audio('./audio/chick_dying.mp3');

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    /**
     * This function creates a new Chick instance.
     * 
     * @param {number} x - The initial x position of the chick.
     */
    constructor(x) {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.initializeProperties(x);
        this.applyGravity();
        this.animate();
    }

    /**
     * This function initializes the properties of the chick.
     * 
     * @param {number} x - The initial x position of the chick.
     */
    initializeProperties(x) {
        this.x = x;
        this.speed = 0.5 + Math.random() * 0.25;
        this.height = 60 + Math.random() * 20;
        this.y = this.y - (this.height - 60);
    }

    /**
     * This function handles the main animation loop for the chick, including jumping, walking, and dying.
     */
    animate() {
        setInterval(() => {
            this.jumping();
        }, 1000 / 60);
        setInterval(() => {
            this.walkingAnimation();
        }, 120);
        setInterval(() => {
            this.handleChickDying();
        }, 50);
    }

    /**
     * This function handles the jumping behavior of the chick.
     */
    jumping() {
        if (!this.isChickenDead && !this.isAboveGround()) {
            this.jump();
        }
    }

    /**
     * This function makes the chick jump.
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * This function handles the walking animation of the chick.
     */
    walkingAnimation() {
        if (!this.isChickenDead) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * This function handles the dying behavior and animation of the chick.
     */
    handleChickDying() {
        if (this.isHurt() && !this.isChickenDead) {
            this.isChickenDead = true;
            this.deadAnimation();
            this.playDeadChickSound();
        }
    }

    /**
     * This function handles the dead animation of the chick.
     */
    deadAnimation() {
        this.loadImage(this.IMAGES_DEAD);
    }

    /**
     * This function plays the sound of the chick dying.
     */
    playDeadChickSound() {
        if (audio) this.chicken_dead_sound.play();
    }
}