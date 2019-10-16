import Box from './Box.js';

class Pipe extends Box {

    constructor(container, width, height, inverted, x, y, dx, dy) {
        super(container, width, height, 1, x, y, dx, dy);
        this.inverted = inverted;
        this.element.style.background = `url("./images/pipe-${(this.inverted) ? 'up' : 'down'}.png")`;
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.backgroundSize = "cover";
        this.element.style.zIndex = '0';
        //this.element.style.backgroundPosition = `${}px ${}px`;

        this.isPipe = true;
    }

}

export default Pipe;