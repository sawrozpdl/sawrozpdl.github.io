class Box {

    constructor(container,isTop,color, row, width, height, x, y, helixWidth, speed) {
        this.container = container;
        this.isTop = isTop;
        this.color = color;
        this.row = row;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.helixWidth = helixWidth;
        this.speed = speed;

        this.container.style.position = 'relative';
        this.element = document.createElement('span');
        this.element.style.position = 'absolute';
        this.element.style.background = this.color;
        this.element.style.transition = 'background 0.2s';
        
        this.factor = y;
        this.amplitude = this.helixWidth * 2.5;
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
        this.element.style.top = this.row * this.height + ((this.isTop) ? this.first : ((this.helixWidth - this.height) - this.first)) + 'px';
        
        var val = Math.cos(this.factor - this.row / 5);
        var val2 = Math.sin(this.factor - this.row / 5);
        var temp = 0;
        if (!this.isTop) {
            temp = val;
            val = val2;
            val2 = val;
        }
        this.element.style.transform = `scale(${(val > 0) ? (val) : (val2 / 5)})`;
    }

    move() {
        this.factor += this.speed;
        this.update();
    }
}

export default Box;