class Box {

    constructor(container,isTop,color, row, width, height, x, y, length) {
        this.container = container;
        this.isTop = isTop;
        this.color = color;
        this.row = row;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.length = length;

        this.container.style.position = 'relative';
        this.element = document.createElement('span');
        this.element.style.position = 'absolute';
        this.element.style.background = this.color;
        this.element.style.transition = 'background 0.2s';
        
        this.factor = y;
        this.amplitude = this.length;
        this.rate = -0.4;
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
        this.first = Math.sin(this.factor) * this.amplitude;
        this.element.style.top = this.row * ((this.isTop) ? this.first : ((this.length - this.height) - this.first)) + 'px';
        //this.element.style.transform = `scale(${1 - Math.abs(this.amplitude / 10)})`;
    }

    bounceRate () {
        this.rate *= -1;
    }

    move() {
        //this.amplitude += this.rate;
        this.factor += 0.1;
        this.update();
        if (this.amplitude < -this.length || this.amplitude > this.length) {
            this.bounceRate();
        }
    }
}

export default Box;