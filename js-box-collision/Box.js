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

        this.container.style.position = 'relative';
        this.element = document.createElement('span');
        this.element.style.position = 'absolute';
        this.element.style.background = `rgb(${Math.floor(Math.random() * 256)},
                                             ${Math.floor(Math.random() * 256)},
                                             ${Math.floor(Math.random() * 256)})`;
        this.element.style.transition = 'background 0.3s ease';
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
        var mratio = (this.mass - box.mass) / (this.mass + box.mass);
        var mcons = 2 / (this.mass + box.mass);
        var temp = this.dx;
        this.dx = mratio * this.dx + mcons * box.mass * box.dx;
        box.dx = mratio * box.dx * -1 + mcons * this.mass * temp;
        temp = this.dy;
        this.dy = mratio * this.dy + mcons * box.mass * box.dy;
        box.dy = mratio * box.dy * -1 + mcons * this.mass * temp;

        temp = this.element.style.background;
        this.element.style.background = box.element.style.background;
        box.element.style.background = temp;
    }

    distance(p1, p2) {
        return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    }

    collidesWith(box) {
        if ((Math.abs(this.x - box.x) > 3 * this.width) || (Math.abs(this.y - box.y) > 3 * this.height)) return false;
        var r1 = {
            x: this.x + (this.width / 2),
            y: this.y + (this.height / 2)
        }
        var r2 = {
            x: box.x + (box.width / 2),
            y: box.y + (box.height / 2)
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