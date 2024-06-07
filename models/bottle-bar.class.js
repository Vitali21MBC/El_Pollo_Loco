class BottleBar extends DrawableObject {

    count = 0;

    IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];

    /**
    * Creates a new BottleBar instance.
    */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 90;
        this.width = 200;
        this.height = 55;
        this.setPercentage(0);
    }

    /**
    * Sets the percentage of the bottle bar filled based on the provided count.
    * 
    * @param {number} count - The number of bottles remaining (0-5).
    */
    setPercentage(count) {
        this.count = count;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * Resolves the index of the image in the IMAGES array based on the count value.
    * 
    * @returns {number} - The index of the image to display in the bottle bar.
    */
    resolveImageIndex() {
        if (this.count == 5) {
            return 5;
        } else if (this.count == 4) {
            return 4;
        } else if (this.count == 3) {
            return 3;
        } else if (this.count == 2) {
            return 2;
        } else if (this.count == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}