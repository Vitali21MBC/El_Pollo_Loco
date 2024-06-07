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
    endbossLifeBar = new EndbossLifeBar();
    staminaBar = new StaminaBar('staminaContainer', 'staminaBar');
    throwableObject = [];
    previousSpaceState = false;
    characterEndbossDistance;
    endbossSoundPlayed = false;
    endScreen = 0;
    animationRequest;
    gameOver = false;
    gameHasEnded;
    keepRunning;
    throwDelay = 0;
    stamina = 0;
    theme_sound = new Audio('./audio/theme.mp3');
    endboss_close_sound = new Audio('./audio/endboss_close.mp3');
    endboss_battle_sound = new Audio('./audio/endboss_battle.mp3');
    game_over_sound_sound = new Audio('./audio/game_over_sound.mp3');
    game_over_voice_sound = new Audio('./audio/game_over_voice.mp3');

    /**
     * This function initializes the game world with the canvas and keyboard.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.playGameThemeMusic();
        this.setSoundVolumes();
        this.setWorld();
        this.run();
        this.updateStaminaBar();
    }

    /**
     * This function draws the game world.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.backgroundMovingOnThirdLayer();
        this.backgroundMovingSecondLayer();
        this.objectsMovingOnFirstLayer();
        this.nonMovingObjectsOnMap();
        let self = this;
        this.animationRequest = requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * This function draws moving background objects on the third layer.
     */
    backgroundMovingOnThirdLayer() {
        this.ctx.translate(this.camera_x * 0.1, 0);
        this.addObjectsToMap(this.level.backgroundObjectsThirdLayer);
        this.addObjectsToMap(this.level.clouds)
        this.ctx.translate(-this.camera_x * 0.1, 0);
    }

    /**
     * This function draws moving background objects on the second layer.
     */
    backgroundMovingSecondLayer() {
        this.ctx.translate(this.camera_x * 0.3, 0);
        this.addObjectsToMap(this.level.backgroundObjectsSecondLayer);
        this.ctx.translate(-this.camera_x * 0.3, 0);
    }

    /**
     * This function draws moving objects on the first layer.
     */
    objectsMovingOnFirstLayer() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjectsFirstLayer);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * This function draws non-moving objects on the map.
     */
    nonMovingObjectsOnMap() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (this.characterEndbossDistance > -600) {
            this.addToMap(this.endbossLifeBar);
        }
        if (this.endScreen != 0) {
            this.addToMap(this.endScreen);
        }
    }

    /**
     * This function adds objects to the map.
     * @param {Array} objects - Array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * This function adds an object to the map.
     * @param {DrawableObject} mo - The object to be added to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * This function flips the image horizontally.
     * @param {DrawableObject} mo - The object whose image is to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This function restores the flipped image to its original state.
     * @param {DrawableObject} mo - The object whose image was flipped.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * This function sets the volumes of various game sounds.
     */
    setSoundVolumes() {
        this.theme_sound.volume = 0.002;
        this.endboss_close_sound.volume = 0.08;
        this.endboss_battle_sound.volume = 0.02;
        this.game_over_sound_sound.volume = 0.4;
        this.game_over_voice_sound.volume = 0.2;
    }

    /**
     * This function plays the game theme music.
     */
    playGameThemeMusic() {
        if (audio) {
            this.theme_sound.play();
        }
    }

    /**
     * This function sets the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * This function runs the game loop.
     */
    run() {
        this.keepRunning = setInterval(() => {
            this.checkCollisions();
            this.checkJumpingOnEnemy();
            this.checkCollections();
            this.checkBottleCollections();
            this.checkThrowObjects();
            this.checkIfBottleIsBroken();
            this.checkBackgroundMusicAudioSetting();
            this.checkDistanceToEndboss();
            this.winning();
            this.losing();
        }, 50);
    }

    /**
     * This function checks collisions between characters and enemies, and between flying bottles and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.collisionCharacterWithEnemy(enemy);
            this.collisionFlyingBottleWithEnemy(enemy);
        });
    }

    /**
     * This function handles collision between the character and an enemy.
     * @param {Enemy} enemy - The enemy object.
     */
    collisionCharacterWithEnemy(enemy) {
        if (this.character.isColliding(enemy) && !enemy.isDead()) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    /**
     * This function handles collision between a flying bottle and an enemy.
     * @param {Enemy} enemy - The enemy object.
     */
    collisionFlyingBottleWithEnemy(enemy) {
        this.throwableObject.forEach((bottle) => {
            if (bottle.isColliding(enemy) && !enemy.isDead()) {
                bottle.broken = true;
                enemy.hit();
                this.updateEndbossLifeBar();
                this.removeEnemyFromMapWhenDead(enemy);
            }
        });
    }

    /**
     * This function updates the end boss life bar.
     */
    updateEndbossLifeBar() {
        this.endbossLifeBar.setPercentage(this.level.enemies[this.endboss.endbossIndex].energy);
    }

    /**
     * This function removes an enemy from the map when it is dead.
     * @param {Enemy} enemy - The enemy object.
     */
    removeEnemyFromMapWhenDead(enemy) {
        let hitChicken = this.level.enemies.indexOf(enemy);
        if (enemy.energy <= 0) {
            setTimeout(() => {
                this.level.enemies.splice(hitChicken, 1);
                this.endboss.endbossIndex--;
            }, 450);
        }
    }

    /**
     * This function checks if the character is jumping on an enemy and handles it.
     */
    checkJumpingOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpingOnEnemy(enemy) && this.character.isAboveGround() && !enemy.isDead()) {
                enemy.hit();
                this.updateEndbossLifeBar();
                this.removeEnemyFromMapWhenDead(enemy);
                this.character.jump();
            }
        });
    }

    /**
     * This function checks if the character collides with coins, collects them, and updates the coin bar.
     */
    checkCollections() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.collect();
                this.removeCoinFromMapWhenCollected(coin);
                this.updateCoinBar();
            }
        });
    }

    /**
     * This function removes a collected coin from the map.
     * @param {Coin} coin - The coin object.
     */
    removeCoinFromMapWhenCollected(coin) {
        let hitCoin = this.level.coins.indexOf(coin);
        this.level.coins.splice(hitCoin, 1);
    }

    /**
     * This function updates the coin bar to reflect the character's coin stack.
     */
    updateCoinBar() {
        this.coinBar.setPercentage(this.character.coinStack);
    }

    /**
     * This function checks if the character collides with bottles, collects them, and updates the bottle bar.
     */
    checkBottleCollections() {
        if (this.character.bottleStack < 5) {
            this.level.bottles.forEach((bottle) => {
                if (this.character.isColliding(bottle)) {
                    this.character.collectBottles();
                    this.removeBottleFromMapWhenCollected(bottle);
                    this.updateBottleBar();
                }
            });
        }
    }

    /**
     * This function removes a collected bottle from the map.
     * @param {Bottle} bottle - The bottle object.
     */
    removeBottleFromMapWhenCollected(bottle) {
        let hitBottle = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(hitBottle, 1);
    }

    /**
     * This function updates the bottle bar to reflect the character's bottle stack.
     */
    updateBottleBar() {
        this.bottleBar.setPercentage(this.character.bottleStack);
    }

    /**
     * This function checks if the character can throw objects, and initiates the throwing process.
     */
    checkThrowObjects() {
        this.throwDelay += 10;
        if (this.keyboard.SPACE && !this.previousSpaceState && this.character.bottleStack >= 1) {
            this.throwingBottle();
        }
        this.previousSpaceState = this.keyboard.SPACE;
    }

    /**
     * This function throws a bottle if the delay is sufficient, updating relevant parameters.
     */
    throwingBottle() {
        if (this.throwDelay >= 500) {
            this.character.bottleStack--;
            this.initiationBottleThrow();
            this.updateStaminaBar();
            this.updateBottleBar();
            this.resetCharacterSleepTimer();
            this.resetThrowDelay();
        }
    }

    /**
     * This function initiates the throwing process by creating a new throwable object and adding it to the map.
     */
    initiationBottleThrow() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObject.push(bottle);
    }

    /**
     * This function updates the stamina bar at intervals until it reaches full capacity.
     */
    updateStaminaBar() {
        let interval = setInterval(() => {
            this.stamina += 1;
            this.staminaBar.setStamina(this.stamina);
            if (this.stamina >= 100) {
                clearInterval(interval);
            }
        }, 1000 / 42);
    }

    /**
     * This function resets the character's sleep timer.
     */
    resetCharacterSleepTimer() {
        this.character.sleepTimer = 0;
    }

    /**
     * This function resets the throw delay and stamina.
     */
    resetThrowDelay() {
        this.throwDelay = 0;
        this.stamina = 0;
    }

    /**
     * This function checks if a thrown bottle is broken and removes it from the map.
     */
    checkIfBottleIsBroken() {
        this.throwableObject.forEach((bottle) => {
            if (bottle.broken) {
                this.removeBottleFromMapWhenBroken(bottle);
            }
        });
    }

    /**
     * This function removes a broken bottle from the map after a delay.
     * @param {ThrowableObject} bottle - The broken bottle object.
     */
    removeBottleFromMapWhenBroken(bottle) {
        let hitBottle = this.throwableObject.indexOf(bottle);
        setTimeout(() => {
            this.throwableObject.splice(hitBottle, 1);
        }, 500);
    }

    /**
     * This function checks and sets the background music and endboss battle music volumes based on the audio setting.
     */
    checkBackgroundMusicAudioSetting() {
        if (audio) {
            this.theme_sound.volume = 0.002;
            this.endboss_battle_sound.volume = 0.02;

        } else {
            this.theme_sound.volume = 0;
            this.endboss_battle_sound.volume = 0;
        }
    }

    /**
     * This function checks the distance to the endboss and initiates endboss battle music if necessary.
     */
    checkDistanceToEndboss() {
        let checkDistance = setInterval(() => {
            let characterEndbossDistance = this.character.x - this.level.enemies[this.endboss.endbossIndex].x;
            this.characterEndbossDistance = characterEndbossDistance;
            if (characterEndbossDistance > -600) {
                this.playEndbossBattleMusic();
            }
            if (this.level.enemies[this.endboss.endbossIndex].isEndbossDead == true) {
                this.pauseEndbossBattleMusic(checkDistance);
            }
        }, 50);
    }

    /**
     * This function plays the endboss battle music if conditions are met.
     */
    playEndbossBattleMusic() {
        this.theme_sound.pause();
        if (!this.endbossSoundPlayed && audio && !this.gameHasEnded) {
            if (audio) {
                this.endboss_close_sound.play();
                this.endboss_battle_sound.play();
            }
            this.endbossSoundPlayed = true;
        }
    }

    /**
     * This function pauses the endboss battle music and clears the interval for checking endboss distance.
     * @param {number} checkDistance - The interval for checking distance to the endboss.
     */
    pauseEndbossBattleMusic(checkDistance) {
        this.endboss_battle_sound.pause();
        clearInterval(checkDistance);
    }

    /**
     * This function checks if the player has won the game.
     */
    winning() {
        if (this.level.enemies[this.endboss.endbossIndex].isEndbossDead == true) {
            this.endScreen = new EndScreen('./img/9_intro_outro_screens/win/win_2.png');
            this.gameEnded();
        }
    }

    /**
     * This function checks if the player has lost the game.
     */
    losing() {
        if (this.gameOver === true || this.level.enemies[this.endboss.endbossIndex].x <= -300) {
            this.playLosingSounds();
            this.endScreen = new EndScreen('./img/9_intro_outro_screens/game_over/game over.png')
            this.gameEnded();
        }
    }

    /**
     * This function plays the losing sounds if the game is over.
     */
    playLosingSounds() {
        if (audio) {
            this.theme_sound.pause();
            this.game_over_voice_sound.play();
            this.game_over_sound_sound.play();
        }
    }

    /**
     * This function ends the game by clearing intervals and animations, marking the game as ended.
     */
    gameEnded() {
        clearInterval(this.keepRunning);
        setTimeout(() => {
            cancelAnimationFrame(this.animationRequest);
        }, 1200);
        this.gameHasEnded = true;
    }
}