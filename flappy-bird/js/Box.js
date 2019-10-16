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
        this.a = 1;

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

    remove() { 
        this.element.parentNode.removeChild(this.element);
        this.isRemoved = true;
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
                    if (!boxes[i].isPipe && !this.isPipe) {
                        if (boxes[i].isBird) {
                            //boxes[i].
                            this.remove();
                            return "powerup";
                        }
                        else if (this.isBird) {
                            //this.
                            boxes[i].remove();
                            return "powerup";
                        }
                        return;
                    }
                    return;
                }
                //boxes[i].
                if (this.isBird || boxes[i].isBird) return "gameover";
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