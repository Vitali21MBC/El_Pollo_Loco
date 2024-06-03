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
    progressBar = new ProgressBar('progressContainer', 'progressBar');
    throwableObject = [];
    previousSpaceState = false;
    theme_sound = new Audio('../audio/theme.mp3');
    endboss_close_sound = new Audio('../audio/endboss_close.mp3');
    endboss_battle_sound = new Audio('../audio/endboss_battle.mp3');
    game_over_sound_sound = new Audio('../audio/game_over_sound.mp3');
    game_over_voice_sound = new Audio('../audio/game_over_voice.mp3');
    endbossSoundPlayed = false;
    endScreen = 0;
    animationRequest;
    gameOver = false;
    gameHasEnded;
    keepRunning;
    throwDelay = 0;
    progress = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkDistanceToEndboss();
        this.updateProgressBar();
        this.theme_sound.play();
        this.theme_sound.volume = 0.002;
        this.endboss_close_sound.volume = 0.08;
        this.endboss_battle_sound.volume = 0.02;
        this.game_over_sound_sound.volume = 0.4;
        this.game_over_voice_sound.volume = 0.2;
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        this.keepRunning = setInterval(() => {
            this.checkCollisions();
            this.checkJumpingOnEnemy();
            this.checkCollections();
            this.checkBottleCollections();
            this.checkIfBottleIsBroken();
            this.checkThrowObjects();
            this.winning();
            this.losing();

        }, 50);
    }

    checkThrowObjects() {
        // Increment throwDelay regardless of space key state
        this.throwDelay += 10; // Increment by 10 milliseconds each frame

        if (this.keyboard.SPACE && !this.previousSpaceState && this.character.bottleStack >= 1) {
            console.log('WERFEN', this.throwDelay);



            if (this.throwDelay >= 500) { // Check if 1 second has passed
                this.character.bottleStack--;
                
                this.updateProgressBar();
                this.bottleBar.setPercentage(this.character.bottleStack);
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObject.push(bottle);
                this.character.sleepTimer = 0;

                // Reset throwDelay after a successful throw
                this.throwDelay = 0;
                this.progress = 0;
            }
        } else {
            // Clear throw delay when space is released
            //   this.throwDelay = 0;
        }
        this.previousSpaceState = this.keyboard.SPACE;
    }

    updateProgressBar() {
        let interval = setInterval(() => {
            this.progress += 1;
            this.progressBar.setProgress(this.progress);
            if (this.progress >= 100) {
                clearInterval(interval);
            }
        }, 1000/42);
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
                    // let hitBottle = this.throwableObject.indexOf(bottle);
                    // setTimeout(() => {
                    //     this.throwableObject.splice(hitBottle, 1);
                    // }, 500);

                    console.log('Chicken energy before hit:', enemy.energy);
                    enemy.hit();
                    console.log('Chicken energy after hit:', enemy.energy);



                    let hitChicken = this.level.enemies.indexOf(enemy);
                    console.log('isChickenDead', enemy.isChickenDead)
                    if (enemy.energy <= 0) {

                        setTimeout(() => {
                            this.level.enemies.splice(hitChicken, 1);
                            this.endboss.endbossIndex--;
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

    checkIfBottleIsBroken() {

        // console.log(this.throwableObject.lenght);

        this.throwableObject.forEach((bottle) => {
            if (bottle.broken) {
                let hitBottle = this.throwableObject.indexOf(bottle);
                setTimeout(() => {
                    this.throwableObject.splice(hitBottle, 1);
                }, 500);
            }


            //         console.log('Flasche ist GEBROCHEN');



        });

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

        if (this.endScreen != 0) {
            this.addToMap(this.endScreen);
        }
        // --------- Space for fixed objects ---------


        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        this.animationRequest = requestAnimationFrame(function () {
            self.draw();
        });

    }



    checkDistanceToEndboss() {
        let checkDistance = setInterval(() => {
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
                clearInterval(checkDistance);
            }

        }, 50);
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

    winning() {
        if (this.level.enemies[this.endboss.endbossIndex].isEndbossDead == true) {
            this.endScreen = new EndScreen('./img/9_intro_outro_screens/win/win_2.png');
            this.gameEnded();
        }
    }

    losing() {
        if (this.gameOver === true) {
            // if (music) {
            this.theme_sound.pause();
            this.game_over_voice_sound.play();
            this.game_over_sound_sound.play();

            // }
            this.endScreen = new EndScreen('./img/9_intro_outro_screens/game_over/game over.png')
            this.gameEnded();
        }
    }

    gameEnded() {
        clearInterval(this.keepRunning);
        setTimeout(() => {
            cancelAnimationFrame(this.animationRequest);
        }, 1200);
        this.gameHasEnded = true;
    }


}