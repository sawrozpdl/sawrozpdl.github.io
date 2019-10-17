import Pipe from './Pipe.js';
import Bird from './Bird.js';
import GetReady from './GetReady.js';
import GameOver from './GameOver.js';

class Game {

    constructor(container, speed, flyForce, birdSize, fps) {
        this.container = container;
        this.startSpeed = speed;
        this.speed = speed;
        this.flyForce = flyForce;
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
        this.gameCanvas.style.overflow = 'hidden';

        this.gamePlatform.style.width = '100%';
        this.gamePlatform.style.background = 'url("./images/platform.png")';
        this.gamePlatform.style.backgroundRepeat = 'repeat-x';
        this.gamePlatform.style.height = this.gameHeight * 0.3 + "px";

        this.score = 0;
        this.scoreUpSound = new Audio('./audios/scoreUp.mp3');
        this.bestScore = localStorage.getItem('bestScore');
        this.medal = {
            x: 0,
            y: 0
        }
        this.liveScoreSpan = document.createElement('span');
        this.liveScoreSpan.setAttribute('class', 'live-score');
        this.liveScoreSpan.style.position = 'absolute';
        this.liveScoreSpan.style.zIndex = '4';
        this.liveScoreSpan.style.top = '0px';
        this.liveScoreSpan.style.left = '48%';
        this.gameCanvas.appendChild(this.liveScoreSpan);
        this.updateScore();

        this.counter = 1;
        this.obstacles = [200, 100, 70, 50, 150, 130, 90];
    }

    updateScore() {
        this.liveScoreSpan.innerText = this.score;
    }

    appendPipePair(pos) {
        var top = new Pipe(this.gameCanvas, 52, 400, false,(this.gameWidth + 62), (pos - 400), (this.speed * -1), 0);
        var bottom = new Pipe(this.gameCanvas, 52, 400, true,(this.gameWidth + 62), (pos + this.birdSize * (this.flyForce - 0.5)), (this.speed * -1), 0);
        top.draw();
        bottom.draw();
        this.objects.push(top);
        this.objects.push(bottom);
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
        this.updateScore();
        this.gameOver = false;
        this.gameStarted = false;
        this.gameOverScreen.hide();
        this.getReadyScreen.show();
        this.objects.forEach(obj => {
            if (!obj.isBird) {
                obj.remove();
            }
        });
        this.checkRemovals();
        this.startMovement();
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
                if (this.score > this.bestScore) {
                    this.bestScore = this.score;
                    localStorage.setItem('bestScore', this.bestScore);
                }
                if (this.score > 5) {
                    if (this.score > 10) {
                        if (this.score > 15) {
                            this.medal.x = 1;
                            this.medal.y = 1;
                        }
                        this.medal.x = 1;
                        this.medal.y = 0;
                    }
                    this.medal.x = 0;
                    this.medal.y = 1;
                }
                this.bird.stopFlap();
                this.bird.flapOver();
                this.gameOverScreen.setStats();
                this.gameOverScreen.show();
                return;
            };

            if (this.counter >= 200) {  
                this.appendPipePair(this.obstacles[Math.floor(Math.random() * this.obstacles.length)]);
                this.counter = 0;
            }
            this.counter++;

            this.objects.forEach(object => {
                if (((object.y + object.height) >= this.gameCanvas.clientHeight ||
                        object.y <= 0) && object.isBird) {
                    this.gameOver = true;
                } else if ((object.x + object.width) < 0) {
                    object.remove();
                } else
                    object.move();
                if (!object.isBird && (object.x + object.width) == this.bird.x) {
                    this.score += 0.5;
                    if (Math.floor(this.score) == this.score) {
                        this.updateScore();
                        this.scoreUpSound.play();
                    }  
                }
                if (object.isBird) {
                    object.accelerate(0.5);
                    object.rotate(undefined);
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
                    this.bird.dy = this.speed * -1 * this.flyForce;
                    break;
            }
        }.bind(this);
        document.onkeyup = function () {
            isDown = false;
        }
        this.gameCanvas.onclick = () => {
            this.bird.dy = this.speed * -1 * this.flyForce;
        }
        this.objects.push(this.bird);
        this.bird.flap();
    }

        positionBird() {
            this.bird.x = 150;
            this.bird.y = 200;
            this.bird.dy = this.speed;
            this.bird.rotate(0);
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