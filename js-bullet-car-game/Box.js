class Box {

    constructor(container, width, height, mass, x, y, dx, dy) {
        this.container = container;
        this.mass = mass;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;

        this.explosionSound = new Audio('./audios/explosion.mp3');
        this.ammoCount = 5;
        this.isRemoved = false;

        this.element = document.createElement('span');
        this.element.style.position = 'absolute';
    }

    draw() {
        this.element.style.height = this.height + 'px';
        this.element.style.width = this.width + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
        this.container.appendChild(this.element);
    }

    update() {
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
    }

    remove(timeout) { //replaced from bounceY
        var that = this;
        setTimeout(() => {
            that.element.parentNode.removeChild(that.element);
        }, timeout);
        this.isRemoved = true;
    }

    destroy() { //replaced from bounceX
        this.element.style.background = "url('./images/blast.gif')";
        this.element.style.backgroundSize = '100% 100%';
        this.explosionSound.play();
        this.remove(400);
    }

    collidesWith(box) {
        return (this.x < (box.x + box.width) &&
            (this.x + this.width) > box.x &&
            this.y < (box.y + box.height) &&
            (this.y + this.height) > box.y);
    }

    checkCollision(boxes) {
        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i] == this) return;
            if (this.collidesWith(boxes[i])) {
                if (boxes[i].isPowerUp || this.isPowerUp) {
                    if (boxes[i].isMainCar) {
                        boxes[i].ammoCount += 3;
                        this.remove();
                    }
                    else {
                        this.ammoCount += 3;
                        this.remove();
                    }
                    return "ammo";
                }
                this.destroy();
                boxes[i].destroy();
                if (this.isMainCar || boxes[i].isMainCar) return "gameover";
            }
        }
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
        this.update();
    }

}

export default Box;