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

    throw() {
        this.speedY = 30;
        if (audio) this.throwing_sound.play();
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            this.x += 10;
        }, 30);
    }

    animate() {
        let flyingBottle = setInterval(() => {
            this.bottleAnimation();
            this.checkIfBottleTouchesGround(flyingBottle);
        }, 75);
        let bottleBreaksInterval = setInterval(() => {
            this.bottleBreaksAnimation(bottleBreaksInterval);
        }, 1000 / 60);
    }

    bottleAnimation() {
        if (this.y < 380 && !this.broken) {
            this.playAnimation(this.IMAGES_BOTTLE);
        }
    }

    checkIfBottleTouchesGround(flyingBottle) {
        if (this.y > 380) {
            this.y = 380;
            this.broken = true;
            clearInterval(flyingBottle);
        }
    }

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