class Level {
    enemies;
    clouds;
    bottles;
    coins;
    // backgroundObjects;
    backgroundObjectsThirdLayer;
    backgroundObjectsSecondLayer;
    backgroundObjectsFirstLayer;
    level_end_x = 4300;

    constructor(enemies, bottles, coins, clouds, backgroundObjectsThirdLayer, backgroundObjectsSecondLayer, backgroundObjectsFirstLayer) {
        this.enemies = enemies;

        this.bottles = bottles;
        this.coins = coins;
        this.clouds = clouds;
        // this.backgroundObjects = backgroundObjects;
        this.backgroundObjectsThirdLayer = backgroundObjectsThirdLayer;
        this.backgroundObjectsSecondLayer = backgroundObjectsSecondLayer;
        this.backgroundObjectsFirstLayer = backgroundObjectsFirstLayer;
    }
}