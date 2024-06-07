class Level {
    enemies;
    clouds;
    bottles;
    coins;
    backgroundObjectsThirdLayer;
    backgroundObjectsSecondLayer;
    backgroundObjectsFirstLayer;
    level_end_x = 4300;

    /**
     * This function creates a new Level instance.
     * 
     * @param {Array} enemies - Array of enemies in the level.
     * @param {Array} bottles - Array of bottles in the level.
     * @param {Array} coins - Array of coins in the level.
     * @param {Array} clouds - Array of clouds in the level.
     * @param {Array} backgroundObjectsThirdLayer - Array of background objects in the third layer.
     * @param {Array} backgroundObjectsSecondLayer - Array of background objects in the second layer.
     * @param {Array} backgroundObjectsFirstLayer - Array of background objects in the first layer.
     */
    constructor(enemies, bottles, coins, clouds, backgroundObjectsThirdLayer, backgroundObjectsSecondLayer, backgroundObjectsFirstLayer) {
        this.enemies = enemies;
        this.bottles = bottles;
        this.coins = coins;
        this.clouds = clouds;
        this.backgroundObjectsThirdLayer = backgroundObjectsThirdLayer;
        this.backgroundObjectsSecondLayer = backgroundObjectsSecondLayer;
        this.backgroundObjectsFirstLayer = backgroundObjectsFirstLayer;
    }
}