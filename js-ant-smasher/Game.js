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
        this.counter = 1;
        this.counterStarted = false;
        this.highScore = 0;

        this.container.style.position = 'relative';
        this.scoreBoard = null;

        this.scoreText = null;
        this.scoreSpan = null;

        this.highscoreText = null;
        this.highscoreSpan = null;

        this.timeSpan = null;
        this.calculation = null;

        this.playAgainButton = null;
    }

    generateScoreBoard() {
        this.scoreBoard = document.createElement('div');
        this.scoreBoard.setAttribute('class', 'score-board');
        this.scoreBoard.style.transition = '1s ease';
        this.scoreBoard.style.position = 'absolute';
        this.scoreBoard.style.top = '-67px';
        this.scoreBoard.style.width = '100%';
        this.scoreBoard.style.textAlign = 'center';

        this.timeSpan = document.createElement('span');
        this.timeSpan.style.color = 'rgb(14, 149, 104)';
        this.scoreBoard.appendChild(this.timeSpan);
        this.timeSpan.style.fontSize = '10px';
        this.timeSpan.style.display = 'none';


        this.highscoreText = document.createElement('span');
        this.highscoreSpan = document.createElement('span');
        this.highscoreText.style.color = 'grey';
        this.highscoreText.innerText = 'High-Score: ';
        this.highscoreText.style.fontSize = '20px';
        this.highscoreSpan.style.fontSize = '20px';
        this.highscoreSpan.style.transition = '0.3s ease';
        this.highscoreText.style.position = "absolute";
        this.highscoreSpan.style.position = "absolute";
        this.highscoreText.style.left = "0px";
        this.highscoreText.style.top = "-25px";
        this.highscoreSpan.style.left = "100px";
        this.highscoreSpan.style.top = "-24px";
        this.highscoreSpan.innerText = '0';
        this.highscoreSpan.style.color = 'grey';

        this.container.appendChild(this.highscoreText);
        this.container.appendChild(this.highscoreSpan);

        this.scoreText = document.createElement('span');
        this.scoreSpan = document.createElement('span');
        this.scoreText.style.color = 'rgb(14, 149, 104)';
        this.scoreText.innerText = 'Ants Killed: ';
        this.scoreText.style.fontSize = '40px';
        this.scoreSpan.style.fontSize = '40px';
        this.scoreSpan.innerText = '0';
        this.scoreSpan.style.color = 'rgb(14, 149, 104)';

        this.scoreBoard.appendChild(this.scoreText);
        this.scoreBoard.appendChild(this.scoreSpan);

        this.calculation = document.createElement('span');
        this.calculation.style.color = 'rgb(14, 149, 104)';
        this.calculation.style.fontSize = '40px';
        this.calculation.style.display = 'none';
        this.scoreBoard.appendChild(this.calculation);

        this.playAgainButton = document.createElement('span');
        this.playAgainButton.style.display = 'none';
        this.playAgainButton.style.cursor = 'pointer';
        this.playAgainButton.innerText = 'Play Again';
        this.playAgainButton.setAttribute('class', 'play-again-button');
        this.playAgainButton.style.border = '2px solid black';
        this.playAgainButton.style.background = 'lightseagreen';
        this.playAgainButton.style.color = 'white';
        this.playAgainButton.style.lineHeight = '1.5';
        this.playAgainButton.style.borderRadius = '15px';
        this.playAgainButton.style.marginTop = '5px';
        this.playAgainButton.style.padding = '0px 12px';
        this.scoreBoard.appendChild(this.playAgainButton);

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

        this.container.onmouseenter = () => {
            if (this.counterStarted) return;
            this.counterStarted = true;
            setInterval(() => {
                this.counter++;
            }, 1000);
        }

        this.container.onclick = () => {
            this.checkSmashes();
        }

        this.playAgainButton.onclick = () => {
            this.hideScoreBoard();
            this.speed *= 0.6; // BACKLOG
            this.generateAnts();
            this.moveAnts();
        }
    }

    checkSmashes() {
        for (var i = 0; i < this.ants.length; i++) {
            if (this.ants[i].isSmashed) {
                this.ants.splice(i, 1);
                this.scoreSpan.innerText = +this.scoreSpan.innerText + 1;
                if (this.ants.length == 0) {
                    this.showScoreBoard();
                }
            }
        }
    }

    showScoreBoard() {
        this.scoreBoard.style.top = '280px';
        this.scoreBoard.style.transform = 'scale(2.5)';
        this.timeSpan.style.display = 'block';
        this.scoreText.style.fontSize = '20px';
        this.scoreSpan.style.fontSize = '20px';
        this.timeSpan.innerText = `You took ${this.counter} seconds`;
        this.calculation.style.display = 'block';
        var score = Math.ceil(this.antNumber * 100 / this.counter);
        this.calculation.innerText = `Score: ${score}`;
        if (score > this.highScore) {
            this.highscoreSpan.innerText = score;
            this.highScore = score;
            this.highscoreSpan.style.transform = "scale(1.5)";
            setTimeout(() => {
                this.highscoreSpan.style.transform = "scale(1)";
            }, 300);
        }
        this.playAgainButton.style.display = 'inline-block';
    }

    hideScoreBoard() {
        this.scoreBoard.style.top = '-50px'; // BACKLOG
        this.timeSpan.style.display = 'none';
        this.calculation.style.display = 'none';
        this.playAgainButton.style.display = 'none';
        this.scoreSpan.innerText = '0';
        this.scoreText.style.fontSize = '20px'; // BACKLOG
        this.scoreSpan.style.fontSize = '20px';
        this.counter = 0;
        this.counterStarted = false;
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