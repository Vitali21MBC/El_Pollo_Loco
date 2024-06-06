class EndbossLifeBar extends DrawableObject {

    percentage = 100;

    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.initializeProperties();
        this.setPercentage(100, this.IMAGES);
    }

    initializeProperties() {
        this.x = 360;
        this.y = 0;
        this.width = 300;
        this.height = 80;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage > 40) {
            return 5;
        } else if (this.percentage > 31) {
            return 4;
        } else if (this.percentage > 21) {
            return 3;
        } else if (this.percentage > 11) {
            return 2;
        } else if (this.percentage > 1) {
            return 1;
        } else {
            return 0;
        }
    }
}