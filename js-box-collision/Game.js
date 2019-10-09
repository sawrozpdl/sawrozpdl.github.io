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
        this.cords = [];
    }

    generateBoxes() {
        for (var i = 0; i < this.boxNumber; i++) {
            var temp = ((i + 1) % 2) ? 1 : -1; //randomize direction of the balls
            var mass = this.randomInt(1,4);
            var width = this.boxWidth + (mass - 1) * 4;
            var height = this.boxHeight + (mass - 1) * 4;
            var uniqCord = this.getRandomXY(width, height, 0.5); // 0.5 margin 1.9 is max
            var box = new Box(this.container, width, height, mass,
                         uniqCord.x - (width / 2), uniqCord.y - (height / 2),  //radius to x,y
                         this.speed * temp, this.speed * temp * -1);
            box.draw();
            this.boxes.push(box);
        }
    }

    moveBoxes() {
        setInterval(() => {
            this.boxes.forEach(box => { 
                if ((box.x + box.width) >= this.container.clientWidth || box.x <= 0)
                    box.bounceX();
                if ((box.y + box.height) >= this.container.clientHeight || box.y <= 0)
                    box.bounceY();
                
                box.move();

                box.checkCollision(this.boxes);
            });
        }, 1000 / this.fps);
    }

    randomInt(min, max) {
        return Math.floor(min +  Math.random()  * (max - min));
    }

    distance(p1, p2) {
        return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    }

    getRandomXY(width, height, margin) { // margin ranges from (0 - 1.9) 2 is not possible
        var cord = {
            x : 0,
            y : 0,
            width : width,
            height : height
        }
        do {
            var collides = false;
            cord.x = this.randomInt(width, this.container.clientWidth - width);
            cord.y = this.randomInt(height, this.container.clientHeight - height);
            for (let cor of this.cords) {
                if(this.distance(cord, cor) <= (cord.width + cor.width) / (2 + margin * -1)) {
                    collides = true;
                    break;
                }
            }
        } while (collides);
        this.cords.push(cord);
        return cord;
    }

    initDev() {  //initialize a master controllable ball for development purposes 
        var neo = new Box(this.container, 35, 35, 2, 1, 1, 0, 0);
        neo.element.style.background = "pink";
        neo.element.style.boxSizing = 'border-box';
        neo.element.style.border = "3px solid violet";
        neo.draw();
        this.boxes.push(neo);
        document.onkeydown = function(event) {
            var keyCode = event.keyCode;
            switch (keyCode) {
              case 37:
                neo.dx -= 1;
                break;
              case 38:
                neo.dy -= 1;
                break;
              case 39:
                neo.dx += 1;
                break;
              case 40:
                neo.dy += 1;
                break;
              case 32:
                  neo.dx = 0;
                  neo.dy = 0;
                  break;
              case 16:
                  neo.element.style.background = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
                  break;
            }
          }
    }
}

export default Game