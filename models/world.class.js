class World {
    character = new Character();
    chicken = new Chicken();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObject = [];
    previousSpaceState = false;
    theme_sound = new Audio('../audio/theme.mp3');
    endboss_close_sound = new Audio('../audio/endboss_close.mp3');
    endboss_battle_sound = new Audio('../audio/endboss_battle.mp3');
    endbossSoundPlayed = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkDistanceToEndboss();
        this.theme_sound.play();
        this.theme_sound.volume = 0.002;
        this.endboss_close_sound.volume = 0.08;
        this.endboss_battle_sound.volume = 0.02;
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

        }, 50);
    }

    checkThrowObjects() {

        if (this.keyboard.SPACE && !this.previousSpaceState && this.character.bottleStack >= 1) {
            this.character.bottleStack--;
            this.bottleBar.setPercentage(this.character.bottleStack);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObject.push(bottle)
            this.character.sleepTimer = 0;
        }
        this.previousSpaceState = this.keyboard.SPACE;
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

                    console.log('Chicken energy:', enemy.energy);
                    enemy.hit();



                    let hitChicken = this.level.enemies.indexOf(enemy);
                    if (enemy.isChickenDead == true) {

                        setTimeout(() => {
                            this.level.enemies.splice(hitChicken, 1);

                            console.log('gelöschtes Huhn', hitChicken);

                        }, 1500);

                    }

                    console.log('Chicken energy:', enemy.energy);

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
                    this.endboss.endbossIndex--;
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

        // ----------Space for moving obects ---------
        this.ctx.translate(this.camera_x * 0.1, 0);
        // this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.backgroundObjectsThirdLayer);
        this.addObjectsToMap(this.level.clouds)
        this.ctx.translate(-this.camera_x * 0.1, 0);
        // ----------Space for moving obects ---------

        // ----------Space for moving obects ---------
        this.ctx.translate(this.camera_x * 0.3, 0);
        // this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.backgroundObjectsSecondLayer);
        this.ctx.translate(-this.camera_x * 0.3, 0);
        // ----------Space for moving obects ---------

        // ----------Space for moving obects ---------
        this.ctx.translate(this.camera_x, 0);
        // this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.backgroundObjectsFirstLayer);
        this.ctx.translate(-this.camera_x, 0);
        // ----------Space for moving obects ---------




        // --------- Space for fixed objects ---------
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        // --------- Space for fixed objects ---------


        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

    checkDistanceToEndboss() {
        let test = setInterval(() => {
          let characterEndbossDistance = this.character.x - this.level.enemies[this.endboss.endbossIndex].x;
          // console.log('endbossIndex', this.endboss.endbossIndex);
          // console.log('characterEndbossDistance', characterEndbossDistance);
      
          if (characterEndbossDistance > -600) {
            this.theme_sound.pause();
      
            if (!this.endbossSoundPlayed) {
              this.endboss_close_sound.play();
              this.endboss_battle_sound.play();
              this.endbossSoundPlayed = true;
            }
          } else {
            this.endbossSoundPlayed = false;
          }
      
          if (this.level.enemies[this.endboss.endbossIndex].isEndbossDead == true) {
            this.endboss_battle_sound.pause();
          }
      
        }, 50);
      }

      playBossBattleSound(){
        this.endboss_battle_sound.play();
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