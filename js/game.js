let canvas;
let world;
let gameEndInterval;
let keyboard = new Keyboard();

// function startMusic(){
//     var audio = document.getElementById('backgroundMusic');
//     audio.volume = 0.01; // Lautstärke auf 20% einstellen
//     audio.play();
// }

function initiateGame() {
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('progressContainer').classList.remove('d-none');
    initLevel();
    world = new World(canvas, keyboard);
    checkForGameEnd();
}

function checkForGameEnd() {
    console.log('GAME ENDED');
    gameEndInterval = setInterval(() => {
        if (world.gameHasEnded === true) {
            document.getElementById('progressContainer').classList.add('d-none');
            console.log('GAME ENDED');
            document.getElementById('restartGame').classList.remove('d-none');
            // clearInterval(world.backgroundSound);
            // world.background_sound.pause();
        }
    }, 1000 / 60);
}

function restartGame() { 
    // world = null;
    // level1 = null;
    // document.getElementById('restartGame').classList.add('d-none');
    // canvas.classList.add('d-none');
    // clearInterval(gameEndInterval);
    // document.getElementById('startScreen').classList.remove('d-none');
    window.location.reload();
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});