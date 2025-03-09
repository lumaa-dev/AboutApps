// Made by © Lumaa 2023-2025

/**
 * Create a progress bar binded to a HTML element
 */
class Progresser {
    constructor(max = 100, min = 0) {
        this.value = 0;
        this.minimum = min
        this.maximum = max

        this.onIncrement = () => {};
        this.onMaxed = () => {};
    }

    /**
     * Bind the Progresser to an element 
     * @param {HTMLElement} element The element to bind
     */
    setElement(element) {
        this.element = element;
        this.maxWidth = element.clientWidth;

        this.element.style.width = `0%`;
        this.element.setAttribute("data-progresser", "true")
        setTimeout(() => {
            this.element.style.transition = "width linear 1s"
        }, 10);
    }

    /**
     * 
     * @param {number} interval The interval to increment every second
     */
    start(interval = 1) {
        console.log("[Progresser] Started progressing");
        var maxed = false;

        this.interval = setInterval(() => {
            this.value = Math.min(this.value + interval, this.maximum);
            let divided = Math.max(this.value / this.maximum, this.minimum / this.maximum);

            this.element.style.width = `${divided * 100}%`;
            this.onIncrement();

            if (this.value >= this.maximum && !maxed) {
                this.onMaxed();
            }
        }, 1000);
    }

    /**
     * Pauses the currently ongoing Progresser
     */
    pause() {
        if (this.interval) {
            clearInterval(this.interval);
        } else {
            console.error("[Progresser] Couldn't pause/stop an unactive Progresser");
        }
    }

    /**
     * Forcing the progress means you CANNOT stop it or pause it. It uses a simpler technic than the normal one
     */
    forceProgress() {
        setTimeout(() => {
            this.element.style.transition = `width linear ${this.maximum}s`
            this.element.style.width = "100%"
        }, 10);

        setTimeout(() => {
            this.value = this.maximum;
            this.onIncrement();
        }, this.maximum * 1000);
    }

    /**
     * Dropping this Progresser reinitializes the element
     */
    drop() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.element.style.transition = `width ease-out 350ms`;
        setTimeout(() => {
            this.element.style.width = `0%`;
        }, 10);
    }
}