class Character extends MovableObject {
    y = 130;
    height = 300;
    width = 150;
    speed = 10;
    sleepTimer = 0;
    energy = 100;
    

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_SLEEP = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    world;
    offset = {
        top: 120,
        bottom: 15,
        left: 30,
        right: 40
    }

    walking_sound = new Audio('../audio/walking.mp3');
    hurt_sound = new Audio('../audio/hurt.mp3');
    jumping_sound = new Audio('../audio/jump.mp3');
    chicken_attack_sound = new Audio('../audio/chicken_attack.mp3');
    snoring_sound = new Audio('../audio/snoring2.mp3');

    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();

        this.walking_sound.volume = 0.1;
        this.jumping_sound.volume = 0.2;
        this.hurt_sound.volume = 0.25;
        this.chicken_attack_sound.volume = 0.50;
        this.snoring_sound.volume = 0.02;

    }

    animate() {

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
                this.sleepTimer = 0;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
                this.sleepTimer = 0;
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                this.sleepTimer = 0;
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT && !this.isAboveGround() && !this.isDead() || this.world.keyboard.LEFT && !this.isAboveGround() && !this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);

        // Separate interval for idle animation
        setInterval(() => {
            if (this.sleepTimer >= 60 && !(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround() && !this.isDead() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_SLEEP);
                this.snoring_sound.play();
                this.sleepTimer++;
            } else if (this.sleepTimer < 60 && !(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround() && !this.isDead() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_IDLE);
                this.sleepTimer++;
            }
        }, 200);  // Adjust the interval as needed

        // Separate interval for hurt animation
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.chicken_attack_sound.play();
                this.hurt_sound.play();
                this.sleepTimer = 0;
                console.log(this.sleepTimer);
            }
        }, 50);

        // Separate interval for dead animation
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.y = this.y + (this.speed * 2);
            }
        }, 60);

        // Separate interval for jumping animation
        setInterval(() => {
            if (this.isAboveGround() && !this.isDead() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 120);


    }

    jump() {
        this.speedY = 25;
        this.jumping_sound.play();
    }
}