class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 60;
    energy = 50;
    isEndbossDead = false;
    endbossWinSoundPlayed = false;
    offset = {
        top: 75,
        bottom: 0,
        left: 50,
        right: 30
    }
    endboss_hurt_sound = new Audio('./audio/endboss_hurt.mp3');
    endboss_close_sound = new Audio('./audio/endboss_close.mp3');
    endboss_win_sound = new Audio('./audio/endboss_win.mp3');

    IMAGES_ANGRY = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_ANGRY[0]);
        this.loadImages(this.IMAGES_ANGRY);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.initializeProperties();
        this.setSoundVolumes();
        this.animate();
    }

    initializeProperties() {
        this.x = 4200;
        this.endbossIndex = 7;
        this.speed = 1;
    }

    setSoundVolumes() {
        this.endboss_hurt_sound.volume = 0.2;
        this.endboss_close_sound.volume = 0.2;
        this.endboss_win_sound.volume = 0.15;
    }

    animate() {
        setInterval(() => {
            this.angryAnimation();
        }, 500);
        setInterval(() => {
            this.movingLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.walkingAnimation();
        }, 210);
        setInterval(() => {
            this.hurtingAnimation();
        }, 60);
        setInterval(() => {
            this.handlingDeadEndboss();
        }, 120);
    }

    angryAnimation() {
        this.playAnimation(this.IMAGES_ANGRY);
    }

    movingLeft() {
        if (!this.isEndbossDead) {
            this.moveLeft();
        }
    }

    walkingAnimation() {
        if (!this.isEndbossDead) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    hurtingAnimation() {
        if (this.isHurt() && !this.isEndbossDead) {
            if (audio) {
                this.endboss_hurt_sound.play();
            }
            this.playAnimationOnce(this.IMAGES_HURT, 0, 0);
            this.x -= 25;
        }
    }

    handlingDeadEndboss() {
        if (this.isDead() && !this.endbossWinSoundPlayed) {
            this.playDeadChickenSound();
            this.isEndbossDead = true;
            this.endbossWinSoundPlayed = true;
        } else if (this.isDead() && this.endbossWinSoundPlayed) {
            this.deadAnimation();
        }
    }

    playDeadChickenSound() {
        if (audio) {
            this.endboss_close_sound.pause();
            this.endboss_win_sound.play();
        }
    }

    deadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.y -= 20;
        this.x += 15;
        this.height -= 25;
        this.width -= 25;
    }
}