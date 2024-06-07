class Cloud extends MovableObject {
    y = 10;
    width = 500;
    height = 400;

    /**
     * This function creates a new Cloud instance.
     * 
     * @param {number} x - The initial x position of the cloud.
     */
    constructor(x) {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = x + Math.random() * 700;
        this.animate();
    }

    /**
     * This function handles the main animation loop for the cloud, moving it to the left.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}