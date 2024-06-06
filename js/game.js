let canvas;
let world;
let gameEndInterval;
let keyboard = new Keyboard();
let audio = true;

function initiateGame() {
    canvas = document.getElementById('canvas');
    showCanvas();
    initLevel();
    world = new World(canvas, keyboard);
    checkForGameEnd();
    checkTouchControll();
}

function showCanvas() {
    canvas.classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('staminaContainer').classList.remove('d-none');
}

function toggleAudio() {
    const audioButton = document.getElementById('audioButton');
    audio = !audio;
    audioButton.src = audio ? './img/11_icons/soundOn.svg' : './img/11_icons/soundOff.svg';
}

function checkForGameEnd() {
    gameEndInterval = setInterval(() => {
        if (world.gameHasEnded) {
            hideStaminaBar();
            showRestartButton();
            clearInterval(gameEndInterval);
        }
    }, 1000 / 60);
}

function hideStaminaBar() {
    document.getElementById('staminaContainer').classList.add('d-none');
}

function showRestartButton() {
    document.getElementById('restartGame').classList.remove('d-none');
}

function restartGame() {
    window.location.reload();
    checkTouchControll();
}

window.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    setKeyState(event.keyCode, true);
}

function setKeyState(keyCode, isPressed) {
    switch (keyCode) {
        case 39:
            keyboard.RIGHT = isPressed;
            break;
        case 37:
            keyboard.LEFT = isPressed;
            break;
        case 38:
            keyboard.UP = isPressed;
            break;
        case 40:
            keyboard.DOWN = isPressed;
            break;
        case 32:
            keyboard.SPACE = isPressed;
            break;
        case 68:
            keyboard.D = isPressed;
            break;
    }
}

window.addEventListener('keyup', handleKeyUp);

function handleKeyUp(event) {
    setKeyState(event.keyCode, false);
}

function setKeyState(keyCode, isNotPressed) {
    switch (keyCode) {
        case 39:
            keyboard.RIGHT = isNotPressed;
            break;
        case 37:
            keyboard.LEFT = isNotPressed;
            break;
        case 38:
            keyboard.UP = isNotPressed;
            break;
        case 40:
            keyboard.DOWN = isNotPressed;
            break;
        case 32:
            keyboard.SPACE = isNotPressed;
            break;
        case 68:
            keyboard.D = isNotPressed;
            break;
    }
}

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