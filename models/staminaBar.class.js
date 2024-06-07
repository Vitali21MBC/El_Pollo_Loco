class StaminaBar extends DrawableObject {

    /**
     * This function creates a new StaminaBar instance.
     * @param {string} containerId - The id of the container element.
     * @param {string} barId - The id of the bar element.
     */
    constructor(containerId, barId) {
        super();
        this.container = document.getElementById(containerId);
        this.bar = document.getElementById(barId);
        this.stamina = 0;
    }

    /**
     * This function sets the stamina level of the bar.
     * @param {number} stamina - The stamina level (0-100).
     * @throws {Error} If stamina is not between 0 and 100.
     */
    setStamina(stamina) {
        if (stamina < 0 || stamina > 100) {
            throw new Error("Stamina must be between 0 and 100");
        }
        this.stamina = stamina;
        this.update();
    }

    /**
     * This function updates the visual representation of the stamina bar.
     */
    update() {
        this.bar.style.width = this.stamina + '%';
        this.bar.textContent = this.stamina + '%';
    }
}