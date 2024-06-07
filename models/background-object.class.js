class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;


    /**
       * Creates a new BackgroundObject instance.
       * 
       * @param {string} imagePath - The path to the image used for the background object.
       * @param {number} x - The initial x position of the background object on the canvas.
       */
    constructor(imagePath, x) {

        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }

}