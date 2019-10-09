import Ant from './Ant.js';

class Game {

    constructor(container, antNumber, antSize, speed, fps) {
        this.container = container;
        this.antNumber = antNumber;
        this.antSize = antSize;
        this.speed = speed;
        this.fps = fps;
        this.ants = [];
        this.cords = [];
    }

    generateAnts() {
        for (var i = 0; i < this.antNumber; i++) {
            var temp = ((i + 1) % 2) ? 1 : -1; //randomize direction of the ants
            var uniqCord = this.getRandomXY(this.antSize, this.antSize, 0.5); // 0.5 margin 1.9 is max
            var ant = new Ant(this.container, this.antSize, './ant.gif',
                         uniqCord.x,
                         uniqCord.y,
                         this.speed * temp, this.speed * temp * -1);
            ant.draw();
            this.ants.push(ant);
        }
    }

    moveAnts() {
        setInterval(() => {
            this.ants.forEach(ant => { 
                if ((ant.x + ant.width) >= this.container.clientWidth || ant.x <= 0) {
                    ant.bounceX();
                    ant.move();
                    ant.rotate();
                }   
                else if ((ant.y + ant.height) >= this.container.clientHeight || ant.y <= 0) {
                    ant.bounceY();
                    ant.move();
                    ant.rotate();
                }     
                else ant.move();

                var partner = ant.checkCollision(this.ants); // partner is the other ant, this ant collides with
                if (partner) {
                    ant.rotate();
                    partner.rotate();
                }
            });
        }, 1000 / this.fps);
        
        setInterval(() => {
            this.checkSmashes();
        }, 2000);
    }

    checkCollisions() {
        for (var i = 0; i < this.ants.length; i++) {
            for (var j = i + 1; j < this.ants.length; j++) {
                if (this.ants[i].collidesWith(this.ants[j])) {
                    this.ants[i].bounceAgainst(this.ants[j]);
                    this.ants[i].rotate();
                    this.ants[j].rotate();
                }
            }
        }
                    
    }

    checkSmashes() {
        for (var i = 0; i < this.ants.length; i++) 
            if (this.ants[i].isSmashed == 2) 
                this.ants.splice(i, 1);
        if (this.ants.length == 0) {
            //TODO
        }
    }

    initAwareness() {
        //TODO
    }

    randomInt(min, max) {
        return Math.floor(min +  Math.random()  * (max - min));
    }

    distance(p1, p2) {
        return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    }

    getRandomXY(margin) { // margin ranges from (0 - 1.9) 2 is not possible
        var cord = {
            x : 0,
            y : 0
        }
        do {
            var collides = false;
            cord.x = this.randomInt(this.antSize, this.container.clientWidth - this.antSize);
            cord.y = this.randomInt(this.antSize, this.container.clientHeight - this.antSize);
            for (let cor of this.cords) {
                if(this.distance(cord, cor) <= (this.antSize * 2) / (2 + margin * -1)) {
                    collides = true;
                    break;
                }
            }
        } while (collides);
        this.cords.push(cord);
        return cord;
    }
}

export default Game