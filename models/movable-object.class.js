class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;
    hitCooldown = 1000;
    applyGravityInterval;
    coinStack = 0;
    bottleStack = 0;
    coin_sound = new Audio('./audio/coin.mp3');
    bottle_sound = new Audio('./audio/bottle.mp3');

    /**
     * This function creates a new MovableObject instance.
     */
    constructor() {
        super();
        this.coin_sound.volume = 0.02;
        this.bottle_sound.volume = 0.1;
    }

    /**
     * This function applies gravity to the object.
     */
    applyGravity() {
        this.applyGravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * This function checks if the object is above the ground.
     * @returns {boolean} - True if above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            if (this.height > 80) {
                return this.y < 130;
            } else {
                return this.y < 350;
            }
        }
    }

    /**
     * This function checks if the object is colliding with another object.
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} - True if colliding, false otherwise.
     */
    isColliding(mo) {
        return (this.x + this.width) - this.offset.right > (mo.x + mo.offset.left) &&
            (this.y + this.height - 15) - this.offset.bottom > (mo.y + mo.offset.top) &&
            (this.x + this.offset.left) < (mo.x + mo.width) - mo.offset.right &&
            (this.y + this.offset.top) < (mo.y + mo.height) - mo.offset.bottom;
    }

    /**
     * This function checks if the object is jumping on an enemy.
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} - True if jumping on enemy, false otherwise.
     */
    isJumpingOnEnemy(mo) {
        return (this.x + this.width) - this.offset.right > (mo.x + mo.offset.left) &&
            (this.y + this.height) > (mo.y + mo.offset.top) &&
            (this.x + this.offset.left) < (mo.x + mo.width) - mo.offset.right &&
            (this.y + this.offset.top) < (mo.y + mo.height) - mo.offset.bottom;
    }

    /**
     * This function inflicts damage to the object.
     */
    hit() {
        if (this instanceof Endboss) {
            this.energy -= 1;
        } else {
            this.energy -= 5;
        }
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * This function collects a coin.
     */
    collect() {
        this.coinStack += 1;
        if (audio) this.coin_sound.play();
        if (this.coinStack > 10) this.coinStack = 10;
    }

    /**
     * This function collects a bottle.
     */
    collectBottles() {
        this.bottleStack += 1;
        if (audio) this.bottle_sound.play();
        if (this.bottleStack > 5) this.bottleStack = 5;
    }

    /**
     * This function checks if the object is hurt.
     * @returns {boolean} - True if hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 200;
    }

    /**
     * This function checks if the object is dead.
     * @returns {boolean} - True if dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * This function plays an animation for the object.
     * @param {Array} images - Array of image paths for animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * This function plays an animation once for the object.
     * @param {Array} images - Array of image paths for animation.
     * @param {number} i - Index to start the animation from.
     * @param {number} time - Time interval for each frame.
     */
    playAnimationOnce(images, i, time) {
        let animatedIntervall = setInterval(() => {
            let path = images[i];
            this.img = this.imageCache[path];
            i++;
            if (i == images.length) clearInterval(animatedIntervall);
        }, time);
    }

    /**
     * This function moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * This function moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }
}