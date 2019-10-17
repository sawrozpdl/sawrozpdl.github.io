import Box from './Box.js';

class Bird extends Box {

    constructor(container, width, height, x, y, dx, dy) {
        super(container, width, height, 1, x, y, dx, dy);
        this.element.style.background = `url("./images/bird-sprite.png")`;
        this.element.style.backgroundSize = "cover";
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.transition = 'transform 0.4s ease';
        this.element.style.zIndex = '2';
        this.flapIndex = 0;
        this.isBird = true;

        this.flapSound = new Audio('/flappy-bird/audios/flap.mp3');
        this.flapSound.playbackRate = '2.1';
        this.flapSound.volume = '0.1';

        this.gameOverSound = new Audio('/flappy-bird/audios/gameOver.mp3');
        this.gameOverSound.volume = '0.3';
        this.flapy = null;
    }

    flap() {
        this.flapy = setInterval(() => {
            this.element.style.backgroundPosition = `0px -${this.flapIndex * this.height}px`;
            this.flapIndex++;
            this.flapIndex = this.flapIndex % 3;
            this.flapSound.play();
        }, 100);
    }

    stopFlap() {
        clearInterval(this.flapy);
        this.gameOverSound.play();
    }

    flapOver() {
        this.rotate(90);
        var int = setInterval(() => {
            if ((this.y + this.height + this.dy) >= this.container.clientHeight)
                clearInterval(int);
            this.move();
            this.accelerate(0.3);
        }, 1000 / 60);
    }

    rotate(angle) {
        if (angle == undefined)
            this.element.style.transform = `rotate(${(this.dy < 0) ? -35 : 35}deg)`;
        this.element.style.transform = `rotate(${angle}deg)`;
    }

    accelerate(val) {
        this.dy += val;
    }
}

export default Bird;