import Pipe from './Pipe.js';
import Bird from './Bird.js';
import Powerup from './Powerup.js';

class Game {

    constructor(container, speed, carCount, spawnTimeGap, fps) {
        this.container = container;
        this.startSpeed = speed;
        this.speed = speed;
        this.carCount = carCount;
        this.spawnTimeGap = spawnTimeGap;
        this.fps = fps;

        this.objects = [];
        this.gameOver = false;

        this.gameWidth = 600;
        this.gameHeight = 500;

        this.container.style.width = `${this.gameWidth}px`;
        this.container.style.height = `${this.gameHeight}px`;
        this.container.style.margin = 'auto';

        this.gameCanvas = document.createElement('div');
        this.gamePlatform = document.createElement('div');
        this.container.appendChild(this.gameCanvas);
        this.container.appendChild(this.gamePlatform);

        this.gameCanvas.style.width = '100%';
        this.gameCanvas.style.backgroundColor = '#7bd3f7';
        this.gameCanvas.style.backgroundImage = 'url("./images/background.png")';
        this.gameCanvas.style.backgroundRepeat = 'repeat-x';
        this.gameCanvas.style.height = this.gameHeight * 0.7 + "px";
        
        this.gamePlatform.style.width = '100%';
        this.gamePlatform.style.background = 'url("./images/platform.png")';
        this.gamePlatform.style.backgroundRepeat = 'repeat-x';
        this.gamePlatform.style.height = this.gameHeight * 0.3 + "px";
        
    }   

    movePipes() {
        var platformW = 546;
        var canvasW = 556;
        this.mvPipes = setInterval(() => {

            if (platformW <= 0) platformW = 546;
            this.gamePlatform.style.backgroundPosition = `${platformW}px 0px`;
            platformW -= this.speed;
            if (canvasW <= 0) canvasW = 556;
            this.gameCanvas.style.backgroundPosition = `${canvasW}px 130%`;
            canvasW -= this.speed - 1.5;

            this.objects.forEach(object => {
                if ((object.x + object.width) >= this.container.clientWidth || object.x <= 0) {
                    object.destroy();
                } else if (object.y <= -0) {
                    object.destroy();
                } else if (object.y > this.gameCanvas.clientHeight) {
                    object.remove(0);
                    if (!object.isPowerUp)
                        this.increaseScore(1);
                } else
                    object.move();

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

                this.checkRemoplatformWs();

                if (this.gameOver) {
                    clearInterplatformW(this.genCars);
                    clearInterplatformW(this.genPowerUps);
                    clearInterplatformW(this.mvPipes);
                    if (this.score > this.highScore) {
                        this.highScore = this.score;
                    }
                    this.objects.forEach(object => {
                        object.remove(0);
                    });
                    this.objects = [];
                    //SHOW GAMEOVER
                };
            });
        }, 1000 / this.fps);
    }

    checkRemoplatformWs() {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].isRemoved)
                this.objects.splice(i, 1);
        }
    }
}

export default Game;