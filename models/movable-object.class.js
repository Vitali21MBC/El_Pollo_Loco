class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    
    lastHit = 0;
    applyGravityInterval;
    coinStack = 0;
    bottleStack = 0;

    coin_sound = new Audio('../audio/coin.mp3');
    bottle_sound = new Audio('../audio/bottle.mp3');

    constructor(){
        super();
        this.coin_sound.volume = 0.02;
        this.bottle_sound.volume = 0.1;
    }

    applyGravity() {
        this.applyGravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 130;
        }
    }

    isColliding(mo) {
        return (this.x + this.width) - this.offset.right > (mo.x + mo.offset.left) &&
            (this.y + this.height) - this.offset.bottom > (mo.y + mo.offset.top) &&
            (this.x + this.offset.left) < (mo.x + mo.width) - mo.offset.right &&
            (this.y + this.offset.top) < (mo.y + mo.height) - mo.offset.bottom;
    }

    isJumpingOnEnemy(mo) {
        return (this.x + this.width) - this.offset.right > (mo.x + mo.offset.left) &&
            (this.y + this.height + 5) > (mo.y + mo.offset.top) &&
            (this.x + this.offset.left) < (mo.x + mo.width) - mo.offset.right &&
            (this.y + this.offset.top) < (mo.y + mo.height) - mo.offset.bottom;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    collect() {
        this.coinStack += 1;
        this.coin_sound.play();
        if (this.coinStack > 10) {
            this.coinStack = 10;
        }
        console.log('coinStack', this.coinStack);
    }

    collectBottles() {
        this.bottleStack += 1;
        this.bottle_sound.play();
        if (this.bottleStack > 5) {
            this.bottleStack = 5;
        }
        console.log('bottleStack', this.bottleStack);
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 200;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images, i, time) {
        let animatedIntervall = setInterval(() => {
            let path = images[i];
            this.img = this.imageCache[path];
            i++;
            if (i == images.length) {
                clearInterval(animatedIntervall);
            }
        }, time);
    }

    changeSizeOfObject(maxWidth, speed) {
        setInterval(() => {
            if (this.sizeChange) this.objectGettingSmaller(speed);
            if (this.width == 130) this.switchSizeChange();
            if (!this.sizeChange) this.objectGettingLarger(speed);
            if (this.width == maxWidth) { this.sizeChange = true; }
        }, 80);
    }

    switchSizeChange() {
        this.sizeChange = false;

    }

    objectGettingSmaller(speed) {
        this.width -= speed;
        this.height -= speed;
        this.x += speed / 2;
        this.y += speed / 2;
    }

    objectGettingLarger(speed) {
        this.width += speed;
        this.height += speed;
        this.x -= speed / 2;
        this.y -= speed / 2;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }
}