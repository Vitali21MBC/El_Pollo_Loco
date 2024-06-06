class Coin extends MovableObject {

    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }

    constructor(x, y) {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 150;
        this.sizeChange = true;
        this.sizeChangeAnimation(170, 10);
    }

    sizeChangeAnimation(maxWidth, speed) {
        setInterval(() => {
            if (this.sizeChange) this.objectGettingSmaller(speed);
            if (this.width === 130) this.switchSizeChange();
            if (!this.sizeChange) this.objectGettingLarger(speed);
            if (this.width === maxWidth) this.sizeChange = true;
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
}