import Box from './Box.js';

class Car extends Box {

    constructor(container, width, height, image, mass, x, y, dx, dy) {
        super(container, width, height, mass, x, y, dx, dy);
        this.element.style.background = `url("./cars/${image}")`;
        this.element.style.backgroundSize = "cover";

        this.isMainCar = false;
    }

    rotate(value) {
        this.element.style.transform = `rotate(${value}deg)`;
        setTimeout(() => {
            this.element.style.transform = "rotate(180deg)";
        }, 300);
    }

    shoot(bullet) {
        bullet.x = this.x + this.width / 2 - bullet.width / 2;
        bullet.y = this.y - 45;
        bullet.draw();
    }
}

export default Car;