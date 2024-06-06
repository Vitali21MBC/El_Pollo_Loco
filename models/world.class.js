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

    backgroundMovingOnThirdLayer() {
        this.ctx.translate(this.camera_x * 0.1, 0);
        this.addObjectsToMap(this.level.backgroundObjectsThirdLayer);
        this.addObjectsToMap(this.level.clouds)
        this.ctx.translate(-this.camera_x * 0.1, 0);
    }

    backgroundMovingSecondLayer() {
        this.ctx.translate(this.camera_x * 0.3, 0);
        this.addObjectsToMap(this.level.backgroundObjectsSecondLayer);
        this.ctx.translate(-this.camera_x * 0.3, 0);
    }

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

    setSoundVolumes() {
        this.theme_sound.volume = 0.002;
        this.endboss_close_sound.volume = 0.08;
        this.endboss_battle_sound.volume = 0.02;
        this.game_over_sound_sound.volume = 0.4;
        this.game_over_voice_sound.volume = 0.2;
    }

    playGameThemeMusic() {
        if (audio) {
            this.theme_sound.play();
        }
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
            this.checkThrowObjects();
            this.checkIfBottleIsBroken();
            this.checkBackgroundMusicAudioSetting();
            this.checkDistanceToEndboss();
            this.winning();
            this.losing();
        }, 50);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.collisionCharacterWithEnemy(enemy);
            this.collisionFlyingBottleWithEnemy(enemy);
        });
    }

    collisionCharacterWithEnemy(enemy) {
        if (this.character.isColliding(enemy) && !enemy.isDead()) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }

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

    updateEndbossLifeBar() {
        this.endbossLifeBar.setPercentage(this.level.enemies[this.endboss.endbossIndex].energy);
    }

    removeEnemyFromMapWhenDead(enemy) {
        let hitChicken = this.level.enemies.indexOf(enemy);
        if (enemy.energy <= 0) {
            setTimeout(() => {
                this.level.enemies.splice(hitChicken, 1);
                this.endboss.endbossIndex--;
            }, 450);
        }
    }

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

    checkCollections() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.collect();
                this.removeCoinFromMapWhenCollected(coin);
                this.updateCoinBar();
            }
        });
    }

    removeCoinFromMapWhenCollected(coin) {
        let hitCoin = this.level.coins.indexOf(coin);
        this.level.coins.splice(hitCoin, 1);
    }

    updateCoinBar() {
        this.coinBar.setPercentage(this.character.coinStack);
    }

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

    removeBottleFromMapWhenCollected(bottle) {
        let hitBottle = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(hitBottle, 1);
    }

    updateBottleBar() {
        this.bottleBar.setPercentage(this.character.bottleStack);
    }

    checkThrowObjects() {
        this.throwDelay += 10;
        if (this.keyboard.SPACE && !this.previousSpaceState && this.character.bottleStack >= 1) {
            this.throwingBottle();
        }
        this.previousSpaceState = this.keyboard.SPACE;
    }

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

    initiationBottleThrow() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObject.push(bottle);
    }

    updateStaminaBar() {
        let interval = setInterval(() => {
            this.stamina += 1;
            this.staminaBar.setStamina(this.stamina);
            if (this.stamina >= 100) {
                clearInterval(interval);
            }
        }, 1000 / 42);
    }

    resetCharacterSleepTimer() {
        this.character.sleepTimer = 0;
    }

    resetThrowDelay() {
        this.throwDelay = 0;
        this.stamina = 0;
    }

    checkIfBottleIsBroken() {
        this.throwableObject.forEach((bottle) => {
            if (bottle.broken) {
                this.removeBottleFromMapWhenBroken(bottle);
            }
        });
    }

    removeBottleFromMapWhenBroken(bottle) {
        let hitBottle = this.throwableObject.indexOf(bottle);
        setTimeout(() => {
            this.throwableObject.splice(hitBottle, 1);
        }, 500);
    }

    checkBackgroundMusicAudioSetting() {
        if (audio) {
            this.theme_sound.volume = 0.002;
            this.endboss_battle_sound.volume = 0.02;

        } else {
            this.theme_sound.volume = 0;
            this.endboss_battle_sound.volume = 0;
        }
    }

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

    pauseEndbossBattleMusic(checkDistance) {
        this.endboss_battle_sound.pause();
        clearInterval(checkDistance);
    }

    winning() {
        if (this.level.enemies[this.endboss.endbossIndex].isEndbossDead == true) {
            this.endScreen = new EndScreen('./img/9_intro_outro_screens/win/win_2.png');
            this.gameEnded();
        }
    }

    losing() {
        if (this.gameOver === true || this.level.enemies[this.endboss.endbossIndex].x <= -300) {
            this.playLosingSounds();
            this.endScreen = new EndScreen('./img/9_intro_outro_screens/game_over/game over.png')
            this.gameEnded();
        }
    }

    playLosingSounds() {
        if (audio) {
            this.theme_sound.pause();
            this.game_over_voice_sound.play();
            this.game_over_sound_sound.play();
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