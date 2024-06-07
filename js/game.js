let canvas;
let world;
let gameEndInterval;
let keyboard = new Keyboard();
let audio = true;

/** This function initializes the game by:
 *  - Referencing the canvas element from the DOM.
 *  - Showing the canvas element.
 *  - Initializing the game level.
 *  - Creating a new World object, passing the canvas and keyboard references.
 *  - Setting an interval to check for game end.
 *  - Adding touch controls listeners.
 */
function initiateGame() {
    canvas = document.getElementById('canvas');
    showCanvas();
    initLevel();
    world = new World(canvas, keyboard);
    checkForGameEnd();
    checkTouchControll();
}

/** 
 * This function shows the canvas element and hides the start screen and stamina container. 
*/
function showCanvas() {
    canvas.classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('staminaContainer').classList.remove('d-none');
}
/** 
 * This function toggles the audio on/off and updates the audio button image accordingly. 
*/
function toggleAudio() {
    const audioButton = document.getElementById('audioButton');
    audio = !audio;
    audioButton.src = audio ? './img/11_icons/soundOn.svg' : './img/11_icons/soundOff.svg';
}

/** 
 * This function sets up an interval to check if the game has ended (based on the world object's gameHasEnded property).
 *  - If the game has ended, it hides the stamina bar, shows the restart button, and clears the interval.
 */
function checkForGameEnd() {
    gameEndInterval = setInterval(() => {
        if (world.gameHasEnded) {
            hideStaminaBar();
            showRestartButton();
            clearInterval(gameEndInterval);
        }
    }, 1000 / 60);
}

/** 
 * This function hides the stamina container element. 
*/
function hideStaminaBar() {
    document.getElementById('staminaContainer').classList.add('d-none');
}

/** 
 * This function removes the "d-none" class from the restart game button element, making it visible.
*/
function showRestartButton() {
    document.getElementById('restartGame').classList.remove('d-none');
}

/**
 * This function reloads the window, essentially restarting the game. It also calls the checkTouchControll function again. 
*/
function restartGame() {
    window.location.reload();
    checkTouchControll();
}

window.addEventListener('keydown', handleKeyDown);

/** 
 * This function is an event listener for the 'keydown' event. It sets the corresponding key state in the keyboard object to true based on the pressed keycode. 
*/
function handleKeyDown(event) {
    setKeyState(event.keyCode, true);
}

/** 
 * This function updates the state of a key (pressed) in the keyboard object based on the provided keycode. 
*/
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

/** 
 * This function is an event listener for the 'keyup' event. It sets the corresponding key state in the keyboard object to false based on the released keycode. 
*/
function handleKeyUp(event) {
    setKeyState(event.keyCode, false);
}

/** 
 * This function updates the state of a key (not pressed) in the keyboard object based on the provided keycode. 
*/
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

/** 
 * This function adds touch event listeners for the left, right, up, and throw buttons, updating the corresponding key states in the keyboard object. 
*/
function checkTouchControll() {
    checkTouchLeft();
    checkTouchRight();
    checkTouchUp();
    checkTouchSpace();
}

/** 
 * This function adds touch event listeners for left button.
 * They prevent default behavior, set the corresponding key state in the keyboard object to true on touch start, and set it to false on touch end. 
*/
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

/** 
 * This function adds touch event listeners for right button. 
 * They prevent default behavior, set the corresponding key state in the keyboard object to true on touch start, and set it to false on touch end. 
*/
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

/** 
 * This function adds touch event listeners for up button. 
 * They prevent default behavior, set the corresponding key state in the keyboard object to true on touch start, and set it to false on touch end. 
*/
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

/** 
 * This function adds touch event listeners for space button. 
 * They prevent default behavior, set the corresponding key state in the keyboard object to true on touch start, and set it to false on touch end. 
*/
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