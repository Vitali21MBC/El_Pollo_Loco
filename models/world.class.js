class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObject = [];
    theme_sound = new Audio('../audio/theme.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.theme_sound.play();
        this.theme_sound.volume = 0.002;
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollections();
            this.checkBottleCollections();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        console.log(this.character.bottleStack);
        if (this.keyboard.D && this.character.bottleStack >= 1) {
            this.character.bottleStack--;
            this.bottleBar.setPercentage(this.character.bottleStack);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObject.push(bottle)
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollections() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.collect();
                let hitCoin = this.level.coins.indexOf(coin);
                this.level.coins.splice(hitCoin, 1);
                this.coinBar.setPercentage(this.character.coinStack);
            }
        });
    }

    checkBottleCollections() {
        if (this.character.bottleStack < 5) {
            this.level.bottles.forEach((bottle) => {
                if (this.character.isColliding(bottle)) {
                    this.character.collectBottles();
                    let hitBottle = this.level.bottles.indexOf(bottle);
                    this.level.bottles.splice(hitBottle, 1);
                    this.bottleBar.setPercentage(this.character.bottleStack);
                }
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds)
        this.ctx.translate(-this.camera_x, 0);
        // --------- Space for fixed objects ---------
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
        // --------- Space for fixed objects ---------
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        ;

        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


}