class Box {

    constructor(container, width, height, mass, x, y, dx, dy) {
        this.container = container;
        this.mass = mass;
        this.width = width + (this.mass - 1) * 3;
        this.height = height + (this.mass - 1) * 3;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;

        this.container.style.position = 'relative';
        this.element = document.createElement('span');
        this.element.style.position = 'absolute';
        this.element.style.background = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
    }

    draw() {
        this.element.style.height = this.height + 'px';
        this.element.style.width = this.width + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
        this.element.style.borderRadius = "50%";
        this.container.appendChild(this.element);
    }

    update() {
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
    }

    bounceX() {
        this.dx *= -1;
    }

    bounceY() {
        this.dy *= -1;
    }

    bounceAgainst(box) {
        var temp = this.dx * (this.mass / box.mass);
        this.dx = box.dx * (box.mass / this.mass);
        box.dx = temp;
        temp = this.dy * (this.mass / box.mass);
        this.dy = box.dy * (box.mass / this.mass);
        box.dy = temp;
    }

    distance(p1, p2) {
        return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    }

    collidesWith(box) {
        var r1 = {
            x : this.x + (this.width / 2),
            y : this.y + (this.height / 2)
        }
        var r2 = {
            x : box.x + (box.width / 2),
            y : box.y + (box.height / 2)
        }
        return this.distance(r1, r2) <= (this.width + box.width) / 2; 
    }

    checkCollision(boxes) {
        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i] == this) return;
            if (this.collidesWith(boxes[i])) {
                this.bounceAgainst(boxes[i]);
                this.move();
                boxes[i].move();
                return boxes[i];
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