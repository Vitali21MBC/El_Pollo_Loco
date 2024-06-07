let level1;

/** 
 * This function initializes the level data for the game. 
 *  It creates a new Level object, passing in several arrays containing information about:
 *  - Enemies: An array of Chicken and Endboss objects representing enemies at specific positions.
 *  - Projectiles: An array of Bottle objects representing thrown bottles at specific positions.
 *  - Coins: An array of Coin objects representing collectable coins at specific positions (x, y coordinates).
 *  - Clouds: An array of Cloud objects representing background clouds at specific positions.
 *  - Background layers (air, foreground, etc.): An array of BackgroundObject objects representing different layers of the background with image paths and initial x positions.
 */
function initLevel() {

    level1 = new Level(
        [
            new Chicken(500),
            new Chick(1000),
            new Chicken(1500),
            new Chick(2000),
            new Chick(2500),
            new Chicken(3000),
            new Chicken(3500),
            new Endboss(4500)
        ],
        [
            new Bottle(-500),
            new Bottle(-100),
            new Bottle(300),
            new Bottle(300),
            new Bottle(700),
            new Bottle(1000),
            new Bottle(1400)
        ],
        [
            new Coin(500, 240),
            new Coin(700, 35),
            new Coin(900, 260),
            new Coin(1100, 25),
            new Coin(2020, 30),
            new Coin(2120, 20),
            new Coin(2200, 30),
            new Coin(2600, 180),
            new Coin(3000, 40),
            new Coin(3300, 30),
        ],
        [
            new Cloud(-200),
            new Cloud(600),
            new Cloud(1400),
            new Cloud(2200),
            new Cloud(3000),
            new Cloud(3800),
        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', -719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/air.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/air.png', 719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 718),
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 6),
        ],
        [
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 6),
        ],
        [
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 6),
        ],
    );
}