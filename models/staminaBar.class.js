class StaminaBar extends DrawableObject {

    constructor(containerId, barId) {
        super();
        this.container = document.getElementById(containerId);
        this.bar = document.getElementById(barId);
        this.stamina = 0;
    }

    setStamina(stamina) {
        if (stamina < 0 || stamina > 100) {
            throw new Error("Stamina must be between 0 and 100");
        }
        this.stamina = stamina;
        this.update();
    }

    update() {
        this.bar.style.width = this.stamina + '%';
        this.bar.textContent = this.stamina + '%';
    }
}