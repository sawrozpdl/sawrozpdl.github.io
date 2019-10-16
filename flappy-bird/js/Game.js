import Pipe from './Pipe.js';
import Bird from './Bird.js';
import Powerup from './Powerup.js';
import GetReady from './GetReady.js';
import GameOver from './GameOver.js';

class Game {

    constructor(container, speed, birdSize, fps) {
        this.container = container;
        this.startSpeed = speed;
        this.speed = speed;
        this.birdSize = birdSize;
        this.fps = fps;

        this.bird = null;
        this.objects = [];
        this.gameOver = false;
        this.gameStarted = false;
        this.getReadyScreen = null;
        this.gameOverScreen = null;

        this.gameWidth = 600;
        this.gameHeight = 500;

        this.container.style.width = `${this.gameWidth}px`;
        this.container.style.height = `${this.gameHeight}px`;
        this.container.style.margin = 'auto';

        this.gameCanvas = document.createElement('div');
        this.gameCanvas.style.position = 'relative';
        this.gamePlatform = document.createElement('div');
        this.container.appendChild(this.gameCanvas);
        this.container.appendChild(this.gamePlatform);

        this.gameCanvas.style.width = '100%';
        this.gameCanvas.style.backgroundColor = '#7bd3f7';
        this.gameCanvas.style.backgroundImage = 'url("./images/background.png")';
        this.gameCanvas.style.backgroundRepeat = 'repeat-x';
        this.gameCanvas.style.backgroundPosition = "0px 130%";
        this.gameCanvas.style.height = this.gameHeight * 0.7 + "px";

        this.gamePlatform.style.width = '100%';
        this.gamePlatform.style.background = 'url("./images/platform.png")';
        this.gamePlatform.style.backgroundRepeat = 'repeat-x';
        this.gamePlatform.style.height = this.gameHeight * 0.3 + "px";

        this.score = 0;
        this.bestScore = 0;
        this.medal = {
            x: 0,
            y: 0
        }
        this.liveScoreSpan = document.createElement('span');
        this.liveScoreSpan.setAttribute('class', 'live-score');
        this.liveScoreSpan.style.position = 'absolute';
        this.liveScoreSpan.style.top = '0px';
        this.liveScoreSpan.style.left = '48%';
        this.gameCanvas.appendChild(this.liveScoreSpan);
        this.updateScore();
    }

    updateScore() {
        this.liveScoreSpan.innerText = this.score;
    }

    startGame() {
        this.spawnBird();
        this.startMovement();
        this.getReadyScreen = new GetReady(this.gameCanvas);
        this.gameOverScreen = new GameOver(this);

        this.getReadyScreen.onclick(() => {
            this.getReadyScreen.hide();
            this.gameStarted = true;
        });

        this.gameOverScreen.onclick(() => {
            if (this.score > this.bestScore)
                this.bestScore = this.score;
            this.reset();
        });
        this.getReadyScreen.show();
    }

    reset() {
        this.score = 0;
        this.gameOver = false;
        this.gameStarted = false;
        this.gameOverScreen.hide();
        this.getReadyScreen.show();
        this.startMovement();
        this.objects.forEach(obj => {
            if (!obj.isBird) {
                obj.remove(0);
            }
        });
        this.positionBird();
        this.bird.flap();
    }

    startMovement() {
        var platformW = 546;
        var canvasW = 556;
        this.startMV = setInterval(() => {

            if (platformW <= 0) platformW = 546;
            this.gamePlatform.style.backgroundPosition = `${platformW}px 0px`;
            platformW -= this.speed;
            if (canvasW <= 0) canvasW = 556;
            this.gameCanvas.style.backgroundPosition = `${canvasW}px 130%`;
            canvasW -= (this.speed - 1.8);

            if (!this.gameStarted) return;

            if (this.gameOver) {
                clearInterval(this.startMV);
                if (this.score > this.highScore) {
                    this.highScore = this.score;
                }
                this.bird.stopFlap();
                this.gameOverScreen.setStats();
                this.gameOverScreen.show();
                return;
            };

            this.objects.forEach(object => {
                if (((object.y + object.height) >= this.gameCanvas.clientHeight ||
                        object.y <= 0) && object.isBird) {
                    this.gameOver = true;
                } else
                    object.move();
                    if (object.isBird) {
                        object.accelerate(0.5);
                        object.rotate();
                    }

                var check = object.checkCollision(this.objects);

                switch (check) {
                    case "gameover":
                        this.gameOver = true;
                        break;
                    case "powerup":
                        break;
                    case "shot":
                        this.increaseScore(1);
                        break;
                }

                this.checkRemovals();


            });
        }, 1000 / this.fps);
    }


    spawnBird() {
        this.bird = new Bird(this.gameCanvas, this.birdSize, (this.birdSize * (19 / 25)), undefined, undefined, 0, undefined);
        this.positionBird();
        this.bird.draw();
        var isDown = false;
        document.onkeydown = function (event) {
            if (isDown) return;
            isDown = true;
            var keyCode = event.keyCode;
            switch (keyCode) {
                case 32:
                    this.bird.dy = this.speed * -5;
                    break;
            }
        }.bind(this);
        document.onkeyup = function () {
            isDown = false;
        }
        this.objects.push(this.bird);
        this.bird.flap();
    }

        positionBird() {
            this.bird.x = 150;
            this.bird.y = 200;
            this.bird.dy = this.speed;
            this.bird.element.style.transform = 'rotate(0deg)';
            this.bird.update();
        }

        checkRemovals() {
            for (var i = 0; i < this.objects.length; i++) {
                if (this.objects[i].isRemoved)
                    this.objects.splice(i, 1);
            }
        }
    }

    export default Game;