class Coin extends MovableObject {

    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }

    /**
     * This function creates a new Coin instance.
     * 
     * @param {number} x - The initial x position of the coin.
     * @param {number} y - The initial y position of the coin.
     */
    constructor(x, y) {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 150;
        this.sizeChange = true;
        this.sizeChangeAnimation(170, 10);
    }

    /**
     * This function handles the size change animation of the coin.
     * 
     * @param {number} maxWidth - The maximum width the coin can reach during the animation.
     * @param {number} speed - The speed at which the coin changes size.
     */
    sizeChangeAnimation(maxWidth, speed) {
        setInterval(() => {
            if (this.sizeChange) this.objectGettingSmaller(speed);
            if (this.width === 130) this.switchSizeChange();
            if (!this.sizeChange) this.objectGettingLarger(speed);
            if (this.width === maxWidth) this.sizeChange = true;
        }, 80);
    }

    /**
     * This function switches the size change direction of the coin.
     */
    switchSizeChange() {
        this.sizeChange = false;
    }

    /**
     * This function decreases the size of the coin.
     * 
     * @param {number} speed - The speed at which the coin decreases in size.
     */
    objectGettingSmaller(speed) {
        this.width -= speed;
        this.height -= speed;
        this.x += speed / 2;
        this.y += speed / 2;
    }

    /**
     * This function increases the size of the coin.
     * 
     * @param {number} speed - The speed at which the coin increases in size.
     */
    objectGettingLarger(speed) {
        this.width += speed;
        this.height += speed;
        this.x -= speed / 2;
        this.y -= speed / 2;
    }
}