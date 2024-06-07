class ThrowableObject extends MovableObject {

    throwInterval;
    broken = false;
    offset = {
        top: 10,
        bottom: 10,
        left: 0,
        right: 0
    }
    throwing_sound = new Audio('./audio/throw.mp3');
    breaking_bottle_sound = new Audio('./audio/breaking_bottle.mp3');

    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * This function creates a new ThrowableObject instance.
     * @param {number} x - The x-coordinate of the throwable object.
     * @param {number} y - The y-coordinate of the throwable object.
     */
    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.throw();
        this.animate();
        this.throwing_sound.volume = 0.3;
        this.breaking_bottle_sound.volume = 0.05;
    }

    /**
     * This function throws the throwable object.
     */
    throw() {
        this.speedY = 30;
        if (audio) this.throwing_sound.play();
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            this.x += 10;
        }, 30);
    }

    /**
     * This function animates the throwable object.
     */
    animate() {
        let flyingBottle = setInterval(() => {
            this.bottleAnimation();
            this.checkIfBottleTouchesGround(flyingBottle);
        }, 75);
        let bottleBreaksInterval = setInterval(() => {
            this.bottleBreaksAnimation(bottleBreaksInterval);
        }, 1000 / 60);
    }

    /**
     * This function animates the throwable object as it flies.
     */
    bottleAnimation() {
        if (this.y < 380 && !this.broken) {
            this.playAnimation(this.IMAGES_BOTTLE);
        }
    }

    /**
     * This function checks if the throwable object touches the ground.
     * @param {number} flyingBottle - The interval for the flying bottle animation.
     */
    checkIfBottleTouchesGround(flyingBottle) {
        if (this.y > 380) {
            this.y = 380;
            this.broken = true;
            clearInterval(flyingBottle);
        }
    }

    /**
     * This function animates the throwable object when it breaks.
     * @param {number} bottleBreaksInterval - The interval for the bottle breaking animation.
     */
    bottleBreaksAnimation(bottleBreaksInterval) {
        if (this.broken) {
            this.playAnimationOnce(this.IMAGES_SPLASH, 0, 60);
            if (audio) {
                this.breaking_bottle_sound.play();
            }
            clearInterval(bottleBreaksInterval);
            clearInterval(this.throwInterval);
            clearInterval(this.applyGravityInterval);
        }
    }
}