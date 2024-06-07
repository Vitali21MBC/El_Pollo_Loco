class CoinBar extends DrawableObject {

    count = 0;

    IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    /**
     * This function creates a new CoinBar instance.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.initializeProperties();
        this.setPercentage(this.count);
    }

    /**
     * This function initializes the properties of the coin bar.
     */
    initializeProperties() {
        this.x = 20;
        this.y = 45;
        this.width = 200;
        this.height = 55;
    }

    /**
     * This function sets the percentage of the coin bar based on the coin count.
     * 
     * @param {number} count - The current coin count.
     */
    setPercentage(count) {
        this.count = count;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * This function resolves the image index based on the current coin count.
     * 
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex() {
        if (this.count == 10) {
            return 5;
        } else if (this.count >= 8) {
            return 4;
        } else if (this.count >= 6) {
            return 3;
        } else if (this.count >= 4) {
            return 2;
        } else if (this.count >= 2) {
            return 1;
        } else {
            return 0;
        }
    }
}