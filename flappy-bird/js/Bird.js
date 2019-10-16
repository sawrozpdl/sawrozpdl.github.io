import Box from './Box.js';

class Bird extends Box {

    constructor(container, width, height, x, y, dx, dy) {
        super(container, width, height, 1, x, y, dx, dy);
        this.element.style.background = `url("./images/bird-sprite.png")`;
        this.element.style.backgroundSize = "cover";
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.transition = 'transform 0.4s ease';
        this.flapIndex = 0;
        this.isBird = true;

        this.flapy = null;
    }

    flap() {
        this.flapy = setInterval(() => {
            this.element.style.backgroundPosition = `0px -${this.flapIndex * this.height}px`;
            this.flapIndex++;
            this.flapIndex = this.flapIndex % 3;
        }, 100);
    }

    stopFlap() {
        clearInterval(this.flapy);
    }

    rotate() {
        this.element.style.transform = `rotate(${(this.dy < 0) ? -35 : 35}deg)`;
    }
}

export default Bird;