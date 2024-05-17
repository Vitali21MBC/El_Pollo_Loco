class Cloud extends MovableObject {
    y = 10;
    width = 500;
    height = 400;


    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.1;
        }, 1000 / 60);

    }
}