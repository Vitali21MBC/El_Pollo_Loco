class EndScreen extends DrawableObject {
    x = 0
    y = 0
    height = 480;
    width = 720;

    /**
   * Creates a new end screen instance.
   * - Loads the provided image for the end screen.
   * 
   @param {string} img - The image path for the end screen.
   */
    constructor(img) {
        super().loadImage(img);
    }
}