class StatusBar extends DrawableObject {

    percentage = 100;

    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    /**
     * This function creates a new StatusBar instance.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.initializeProperties();
        this.setPercentage(100);
    }

    /**
     * This function initializes the properties of the status bar.
     */
    initializeProperties() {
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 55;
    }

    /**
     * This function sets the percentage level of the status bar.
     * @param {number} percentage - The percentage level (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * This function resolves the index of the image based on the current percentage level.
     * @returns {number} The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}