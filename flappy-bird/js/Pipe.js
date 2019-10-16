import Box from './Box.js';

class Pipe extends Box {

    constructor(container, width, height, x, y, dx, dy) {
        super(container, width, height, 1, x, y, dx, dy);
        this.element.style.background = `url("./images/cars/${image}")`;
        this.element.style.backgroundSize = "cover";

        this.isPipe = true;
    }

}

export default Pipe;