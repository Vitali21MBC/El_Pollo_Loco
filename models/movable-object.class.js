class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    applyGravityInterval;

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
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
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
            console.log('test', this.img);
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