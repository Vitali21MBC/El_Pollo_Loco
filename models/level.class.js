class Level {
    enemies;
    clouds;
    bottles;
    coins;
    backgroundObjectsThirdLayer;
    backgroundObjectsSecondLayer;
    backgroundObjectsFirstLayer;
    level_end_x = 4300;

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