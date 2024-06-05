let canvas;
let world;
let gameEndInterval;
let keyboard = new Keyboard();
let audio = true;

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
    checkTouchControll();
}

function toggleAudio() {
    const autioButton = document.getElementById('audioButton');
    if (audio) {
        autioButton.src = './img/11_icons/soundOff.svg';
        audio = false;
    }else {
        autioButton.src = './img/11_icons/soundOn.svg';
        audio = true;
    }
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
    checkTouchControll();
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

function checkTouchControll() {
    checkTouchLeft();
    checkTouchRight();
    checkTouchUp();
    checkTouchSpace();
}

function checkTouchLeft() {
    document.getElementById('buttonLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('buttonLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
}

function checkTouchRight() {
    document.getElementById('buttonRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('buttonRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
}

function checkTouchUp() {
    document.getElementById('buttonUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    document.getElementById('buttonUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
}

function checkTouchSpace() {
    document.getElementById('buttonThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('buttonThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}