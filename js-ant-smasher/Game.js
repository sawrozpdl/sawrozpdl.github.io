import Ant from './Ant.js';

class Game {

    constructor(container, scoreSpan, antNumber, antSize, speed, fps) {
        this.container = container;
        this.scoreSpan = scoreSpan;
        this.antNumber = antNumber;
        this.antSize = antSize;
        this.speed = speed;
        this.fps = fps;
        this.ants = [];
        this.cords = [];
        this.counter = 1;

        this.container.style.position = 'relative';
        this.scoreBoard = null;
        this.scoreText = null;
        this.scoreSpan = null;
    }

    generateScoreBoard() {
        this.scoreBoard = document.createElement('div');
        this.scoreBoard.style.transition = '1s ease';
        this.scoreBoard.style.position = 'absolute';
        this.scoreBoard.style.top = '-67px';
        this.scoreBoard.style.width = '100%';
        this.scoreBoard.style.textAlign = 'center';
        

        this.scoreText = document.createElement('span');
        this.scoreSpan = document.createElement('span');
        this.scoreText.innerText = 'Ants Killed: ';
        this.scoreSpan.innerText = '0';
        this.scoreText.style.fontSize = '30px';
        this.scoreSpan.style.fontSize = '40px';
        this.scoreText.style.color = 'rgb(8, 121, 83)';
        this.scoreSpan.style.color = 'green';

        this.scoreBoard.appendChild(this.scoreText);
        this.scoreBoard.appendChild(this.scoreSpan);
        this.container.appendChild(this.scoreBoard);
    }

    generateAnts() {
        for (var i = 0; i < this.antNumber; i++) {
            var temp = ((i + 1) % 2) ? 1 : -1; //randomize direction of the ants
            var uniqCord = this.getRandomXY(1); //1.9 is max
            var ant = new Ant(this.container, this.antSize, './ant.gif',
                uniqCord.x, uniqCord.y,
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
                } else if ((ant.y + ant.height) >= this.container.clientHeight || ant.y <= 0) {
                    ant.bounceY();
                    ant.move();
                    ant.rotate();
                } else ant.move();

                var partner = ant.checkCollision(this.ants); // partner is the other ant, this ant collides with
                if (partner) {
                    ant.rotate();
                    partner.rotate();
                }
            });
        }, 1000 / this.fps);

        setInterval(() => {
            this.counter++;
        }, 1000);

        this.container.onclick = () => {
            this.checkSmashes();
        }
    }

    checkSmashes() {
        for (var i = 0; i < this.ants.length; i++) {
            if (this.ants[i].isSmashed) {
                this.ants.splice(i, 1);
                this.scoreSpan.innerText = +this.scoreSpan.innerText + 1;
                if (this.ants.length == 0) {
                    this.scoreBoard.style.top = '300px';
                    this.scoreBoard.style.transform = 'scale(2.5)';
                    var score = Math.ceil(this.antNumber * 10/ this.counter);
                    this.scoreSpan.innerText = score;
                }
            }
        }
    }

    randomInt(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    }

    distance(p1, p2) {
        return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    }

    getRandomXY(margin) { // margin ranges from (0 - 1.9) 2 is not possible
        var cord = {
            x: 0,
            y: 0
        }
        do {
            var collides = false;
            cord.x = this.randomInt(this.antSize, this.container.clientWidth - this.antSize);
            cord.y = this.randomInt(this.antSize, this.container.clientHeight - this.antSize);
            for (let cor of this.cords) {
                if (this.distance(cord, cor) <= (this.antSize * 2) / (2 + margin * -1)) {
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