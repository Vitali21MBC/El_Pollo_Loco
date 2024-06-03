class ProgressBar extends DrawableObject {
    constructor(containerId, barId) {
        super();
        this.container = document.getElementById(containerId);
        this.bar = document.getElementById(barId);
        this.progress = 0;
    }

    setProgress(progress) {
        if (progress < 0 || progress > 100) {
            throw new Error("Progress must be between 0 and 100");
        }
        this.progress = progress;
        this.update();
    }

    update() {
        this.bar.style.width = this.progress + '%';
        this.bar.textContent = this.progress + '%';
    }
}

// // Beispielverwendung
// const progressBar = new ProgressBar('progress-container', 'progress-bar');

// // Ladebalken fortschrittlich erhöhen
// let progress = 0;
// const interval = setInterval(() => {
//     progress += 10;
//     progressBar.setProgress(progress);
//     if (progress >= 100) {
//         clearInterval(interval);
//     }
// }, 1000);