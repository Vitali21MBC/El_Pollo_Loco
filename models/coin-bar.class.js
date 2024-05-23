class CoinBar extends DrawableObject {

    IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    count = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 250;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0);
    }


    setPercentage(count) {
        this.count = count;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.count == 20) {
            return 5;
        } else if (this.count > 16) {
            return 4;
        } else if (this.count > 12) {
            return 3;
        } else if (this.count > 8) {
            return 2;
        } else if (this.count > 4) {
            return 1;
        } else {
            return 0;
        }
    }

}