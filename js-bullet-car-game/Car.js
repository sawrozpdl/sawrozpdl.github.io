import Box from './Box.js';

class Car extends Box {

    constructor(container, width, height, image, mass, x, y, dx, dy) {
        super(container, width, height, mass, x, y, dx, dy);
        this.element.style.background = `url("./cars/${image}")`;
        this.element.style.backgroundSize = "cover";
    }

    // rotate() {
    //     var horizontalAngle = ((this.dx < 0) ? 270 : 90) * ((this.dx != 0) ? 1 : 0);
    //     var verticalAngle = ((this.dy < 0) ? ((this.dx < 0) ? 360 : 0) : 180) * ((this.dx != 0) ? 1 : 0);
    //     var divident = (this.dx && this.dy) ? 2 : 1;
    //     var value = (horizontalAngle + verticalAngle) / divident;
    //     this.element.style.transform = `rotate(${value}deg)`;
    // }

    rotate(value) {
        this.element.style.transform = `rotate(${value}deg)`;
        setTimeout(() => {
            this.element.style.transform = "rotate(0deg)";
        }, 300);
    }

    shoot(bullet) {
        bullet.x = this.x + this.width / 2 - bullet.width / 2;
        bullet.y = this.y - 45;
        bullet.draw();
    }
}

export default Car;