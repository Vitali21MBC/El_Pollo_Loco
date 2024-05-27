class World {
    character = new Character();
    chicken = new Chicken();
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
            this.checkJumpingOnEnemy();
            this.checkCollections();
            this.checkBottleCollections();
            this.checkThrowObjects();
        }, 1);
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE && this.character.bottleStack >= 1) {
            this.character.bottleStack--;
            this.bottleBar.setPercentage(this.character.bottleStack);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObject.push(bottle)
            this.character.sleepTimer = 0;
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }

            this.throwableObject.forEach((bottle) => {
                if (bottle.isColliding(enemy) && !enemy.isDead()) {
                    bottle.broken = true;

                    // Flaschen werden ausgeblendet, sobald ein Gegner getroffen wird
                    let hitBottle = this.throwableObject.indexOf(bottle);
                    setTimeout(() => {
                        this.throwableObject.splice(hitBottle, 1);
                    }, 500);

                    enemy.hit();


                    let hitChicken = this.level.enemies.indexOf(enemy);
                    setTimeout(() => {
                        this.level.enemies.splice(hitChicken, 1);
                        console.log('gelöschtes Huhn', hitChicken);
                    }, 1500);

                    console.log('Chicken energy:', this.chicken.energy);
                    // console.log('Chicken hit by Bottle', this.chicken);
                    this.chicken.isChickenDead = true;


                    // Gegner wird ausgeblendet, sobald mit Flasche getroffen
                    // let hitChicken = this.level.enemies.indexOf(enemy);
                    // if (this.chicken.isChickenDead == true) {
                    //     setTimeout(() => {
                    //         this.level.enemies.splice(hitChicken, 1);
                    //         console.log('gelöschtes Huhn', hitChicken);
                    //     }, 500);
                    // }

                    // console.log('hitChicken?', hitChicken);

                }
            });
        });
    }

    checkJumpingOnEnemy() {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isJumpingOnEnemy(enemy) && this.character.isAboveGround() && !enemy.isDead()) {
                    enemy.hit();
                    let hitChicken = this.level.enemies.indexOf(enemy);
                    setTimeout(() => {
                        this.level.enemies.splice(hitChicken, 1);
                        console.log('gelöschtes Huhn', hitChicken);
                    }, 450);
                    this.character.jump();
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