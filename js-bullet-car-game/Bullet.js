import Box from './Box.js';

class Bullet extends Box {

    constructor(container, width, height, mass, x, y, dx, dy) {
        super(container, width, height, mass, x, y, dx, dy);
        this.element.style.background = 'url("./images/bullet.png")';
        this.element.style.backgroundSize = 'cover';
        this.element.style.transform = 'rotate(-90deg)';
    }
    
}  

export default Bullet;