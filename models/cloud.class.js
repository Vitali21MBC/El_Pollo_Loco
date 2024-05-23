class Cloud extends MovableObject {
    y = 10;
    width = 500;
    height = 400;



    constructor(x) {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');

        this.x = x + Math.random() * 700;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


}