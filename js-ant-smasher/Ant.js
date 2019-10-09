import Box from './../js-box-collision/Box.js';

class Ant extends Box {

    constructor(container, width, image, x, y, dx, dy) {
        super(container, width, width, 1, x, y, dx, dy); //same mass for all ants
        this.image = image;
        this.element.style.background = `url(${image})`;
        this.element.style.backgroundSize = '100% 100%';
        this.element.style.transition = 'transform 0.2s ease';
        this.isSmashed = 0;
        this.audio = new Audio('oof.mp3');
        this.element.onclick = () => {
            this.audio.play();
            this.isSmashed = true;
            this.element.style.backgroundImage = 'url("blood.png")';
            setTimeout(() => {
                this.element.parentNode.removeChild(this.element);
            }, 1000);
        }
        this.rotate();
    }

    rotate() {
        var horizontalAngle = ((this.dx < 0) ? 270 : 90) * ((this.dx != 0) ? 1 : 0);
        var verticalAngle = ((this.dy < 0) ? ((this.dx < 0) ? 360 : 0) : 180) * ((this.dx != 0) ? 1 : 0);
        var divident = (this.dx && this.dy) ? 2 : 1;
        var value = (horizontalAngle + verticalAngle) / divident;
        this.element.style.transform = `rotate(${value}deg)`;
    }

    move() {
        if (this.isSmashed) return;
        this.x += this.dx;
        this.y += this.dy;
        this.update();
    }
}

export default Ant;