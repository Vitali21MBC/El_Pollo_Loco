let level1;
// function initLevel() {



level1 = new Level(
    [
        new Chicken(),
        new Chick(),
        new Chicken(),
        new Chick(),
        new Chicken(),
        new Endboss()
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
        new Coin(-500),
        new Coin(-100),
        new Coin(300),
        new Coin(700),
        new Coin(1000),
        new Coin(1400)
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
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
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

// }