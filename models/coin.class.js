class Coin extends MovableObject {
    x;
    y;
    width = 150;
    height = 150;
    sizeChange = true;

    constructor(x) {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = x + 700 + Math.random() * 700;
        this.y = 30 + Math.random() * 230;
        this.changeSizeOfObject(170, 10);
    }

}