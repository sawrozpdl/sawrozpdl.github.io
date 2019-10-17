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
        this.amplitude = this.length * 2.5;
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
        
        var val = Math.cos(this.factor);
        var val2 = Math.sin(this.factor);
        var temp = 0;
        if (!this.isTop) {
            temp = val;
            val = val2;
            val2 = val;
        }
        this.element.style.transform = `scale(${(val > 0) ? (val) : val2 / 10})`;
    }

    bounceRate () {
        this.rate *= -1;
    }

    move() {
        //this.amplitude += this.rate;
        this.factor += 0.02;
        this.update();
        if (this.amplitude < -this.length || this.amplitude > this.length) {
            this.bounceRate();
        }
        if (this.factor > 90)
            this.factor = 0;
    }
}

export default Box;