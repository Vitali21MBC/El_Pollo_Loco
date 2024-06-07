class DrawableObject {

    height = 150;
    width = 100;
    x = 120;
    y = 280;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * This function loads an image from the given path and sets it as the object's image.
     * 
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function draws the object on the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * This function loads multiple images from an array of paths and caches them.
     * 
     * @param {string[]} array - An array of paths to the image files.
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}