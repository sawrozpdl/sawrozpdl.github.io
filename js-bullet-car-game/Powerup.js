import Box from './Box.js';

class PowerUp extends Box {

    constructor(container, width, height, x, y, dx, dy) {
        super(container, width, height, 1, x, y, dx, dy);

        this.isPowerUp = true;
        this.element.style.background = 'url("./images/powerup.gif")';
        this.element.style.backgroundSize = 'cover';
    }
}

export default PowerUp;