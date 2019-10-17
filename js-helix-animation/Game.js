import Box from './Box.js';

class Game {

    constructor(container, boxNumber, boxWidth, boxHeight, speed, fps) {
        this.container = container;
        this.boxNumber = boxNumber;
        this.boxWidth = boxWidth;
        this.boxHeight = boxHeight;
        this.speed = speed;
        this.fps = fps;
        this.boxes = [];

        this.length = this.boxWidth * 1.5;
    }

    generateBoxes() {
        for (var i = 0; i < this.boxNumber / 2; i+=0.5) {
            this.generateStrand(1, i);
        }
    }

    generateStrand(row, val) {
        var box1 = new Box(this.container,true,"#FD9C85", row, this.boxWidth, this.boxHeight, val * this.boxWidth * 4,val, this.length);
        var box2 = new Box(this.container,false,"#FD9C85",row, this.boxWidth, this.boxHeight, val * this.boxWidth * 4,val, this.length);
        box1.draw();  
        box2.draw();
        this.boxes.push(box1);
        this.boxes.push(box2);
    }

    moveBoxes() {
        setInterval(() => {
            this.boxes.forEach(box => {
                box.move();
            });
        }, 1000 / this.fps);
    }

    
}

export default Game