import Car from './Car.js';
import Bullet from './Bullet.js';
import Powerup from './Powerup.js';

class Game {

    constructor(container, speed, carCount, spawnTimeGap, fps) {
        this.container = container;
        this.startSpeed = speed;
        this.speed = speed;
        this.carCount = carCount;
        this.spawnTimeGap = spawnTimeGap;
        this.fps = fps;

        this.overtakeCount = 0;
        this.gameWidth = 800;
        this.gameHeight = 700;
        this.scoreHeight = 60;
        this.gameOver = false;
        this.highScore = 0;
        this.score = 0;
        this.isHardcore = undefined;
        this.counter = 0;

        this.laneCords = null;
        this.shuffleCords = null;
        this.generateGameCanvas();

        this.cars = ["blue_car.png", "green_car.png", "orange_car.png", "police_car.png",
            "mini_van.png", "truck.png", "mini_truck.png", "taxi.png",
            "red_car.png", "yellow_car.png", "white_car.png"
        ];
        this.carPointer = 1;
        this.objects = [];
        this.mainCar = null;
        this.genCars = null;
        this.genPowerUps = null;
        this.mvCars = null;


        this.container.style.background = 'url("./images/road.png")';
        this.container.style.backgroundSize = '100%';
        this.container.style.overflow = 'hidden';
        this.container.parentNode.style.position = 'relative';
        this.container.style.position = 'absolute';
        this.container.style.zIndex = '1';

        this.landingPage = null;
        this.gameName = null;
        this.playButton = null;
        this.gameOverName = null;
        this.playAgainButton = null;
        this.gameStats = null;

        this.hardcoreArea = null;
        this.hardCoreCBox = null;
        this.hardCoreText = null;

        this.highScoreArea = null;
        this.highScoreText = null;
        this.highScoreSpan = null;

        this.scoreArea = null;
        this.scoreText = null;
        this.scoreSpan = null;

        this.ammoArea = null;
        this.ammoText = null;
        this.ammoSpan = null;

        this.notifier = null;
    }

    generateGameCanvas() {
        this.container.parentNode.style.width = `${this.gameWidth}px`;
        this.container.style.width = "100%";
        this.container.style.height = `${this.gameHeight}px`;
        this.container.style.margin = `${this.scoreHeight}px auto 0px auto`;
        this.laneCords = [165 * this.gameWidth / 645,
            285 * this.gameWidth / 645,
            405 * this.gameWidth / 645
        ];
        this.shuffleCords = [165 * this.gameWidth / 645,
            285 * this.gameWidth / 645,
            405 * this.gameWidth / 645
        ];
    }

    shuffle(array) {
        array.sort(() => Math.random() - 0.5); // -0.5 to 0.5 so random sort
    }

    notify(string) {
        this.notifier.innerText = string;
        this.notifier.style.transform = 'scale(2)';
        this.notifier.style.opacity = '1';
        setTimeout(() => {
            this.notifier.style.transform = 'scale(0)';
            this.notifier.style.opacity = '0';
        }, 500);
    }

    generateLandingScreen() {
        this.landingPage = document.createElement('div');
        this.landingPage.setAttribute('class', 'landing-page');
        this.landingPage.style.width = `${this.container.clientWidth}px`;
        this.landingPage.style.height = `${this.scoreHeight + this.gameHeight}px`;
        this.landingPage.style.left = "0px";
        this.landingPage.style.zIndex = '2';

        this.gameName = document.createElement('img');
        this.gameName.setAttribute('src', './images/texts/bullet-car.png');
        this.gameName.setAttribute('class', 'header');
        this.landingPage.appendChild(this.gameName);

        this.hardcoreArea = document.createElement('div');
        this.hardcoreArea.style.position = 'absolute';
        this.hardcoreArea.style.top = '42%';
        this.hardcoreArea.style.left = '35%';
        this.hardcoreArea.setAttribute('class', 'hardcore-area');
        this.hardCoreCBox = document.createElement('input');
        this.hardCoreCBox.setAttribute('type', 'checkbox');
        this.hardCoreText = document.createElement('span');
        this.hardCoreText.innerText = " HardCore";
        this.hardcoreArea.appendChild(this.hardCoreCBox);
        this.hardcoreArea.appendChild(this.hardCoreText);
        this.landingPage.appendChild(this.hardcoreArea);

        this.playButton = document.createElement('img');
        this.playButton.setAttribute('src', './images/texts/play.png');
        this.playButton.setAttribute('class', 'button');
        this.playButton.onclick = () => {
            this.hideLandingScreen();
            this.isHardcore = this.hardCoreCBox.checked;
            this.startGame();
        }
        this.landingPage.appendChild(this.playButton);
        this.container.parentNode.appendChild(this.landingPage);
    }

    hideLandingScreen() {
        this.gameName.style.opacity = 0;
        this.playButton.style.opacity = 0;
        this.hardcoreArea.style.opacity = 0;
        this.landingPage.style.zIndex = 0;
        this.playButton.style.transform = "scale(0.7)";
        this.gameName.style.transform = "scale(0.7)";
    }

    generateGameoverScreen() {
        this.gameOverName = document.createElement('img');
        this.gameOverName.setAttribute('src', './images/texts/game-over.png');
        this.gameOverName.setAttribute('class', 'header');
        this.gameOverName.style.position = 'absolute';
        this.playAgainButton = document.createElement('img');
        this.playAgainButton.setAttribute('src', './images/texts/play-again.png');
        this.playAgainButton.setAttribute('class', 'button2');
        this.playAgainButton.style.position = 'absolute';
        this.playAgainButton.onclick = () => {
            this.hideGameoverScreen();
            this.increaseScore(-this.score);
            this.gameOver = false;
            this.restartGame();
        }

        this.landingPage.appendChild(this.gameOverName);
        this.landingPage.appendChild(this.playAgainButton);

        this.gameOverName.style.opacity = '0';
        this.playAgainButton.style.opacity = '0';
        this.gameOverName.style.transform = "scale(0.5)";
        this.playAgainButton.style.transform = "scale(0.5)";
    }

    hideGameoverScreen() {
        this.landingPage.style.zIndex = '0';
        this.gameOverName.style.opacity = '0';
        this.playAgainButton.style.opacity = '0';
        this.gameOverName.style.transform = "scale(0.7)";
        this.playAgainButton.style.transform = "scale(0.7)";
        this.scoreArea.style.top = '0px';
        this.scoreArea.style.transform = 'scale(1)';
    }

    showGameoverScreen() {
        this.landingPage.style.zIndex = '2';
        this.gameOverName.style.opacity = '1';
        this.gameOverName.style.transform = "scale(1)";
        this.playAgainButton.style.opacity = '1';
        this.playAgainButton.style.transform = "scale(1)";

        this.scoreArea.style.top = '320px';
        this.scoreArea.style.transform = 'scale(2)';
    }

    setScoreBoard() {
        this.notifier = document.createElement('span');
        this.notifier.style.transform = 'scale(0)';
        this.notifier.style.fontSize = '20px';
        this.notifier.style.color = 'white';
        this.notifier.style.zIndex = '3';
        this.notifier.style.transition = '0.5s ease';
        this.notifier.style.position = 'absolute';
        this.notifier.style.top = '300px';
        this.notifier.style.width = '100%';
        this.notifier.style.textAlign = 'center';
        this.container.appendChild(this.notifier);

        this.gameStats = document.createElement('div');
        this.gameStats.style.position = 'relative';

        this.highScoreArea = document.createElement('div');
        this.scoreArea = document.createElement('div');
        this.scoreArea.style.transition = '0.5s ease';
        this.ammoArea = document.createElement('div');

        this.highScoreSpan = document.createElement('span');
        this.highScoreText = document.createElement('span');
        this.highScoreArea.appendChild(this.highScoreText);
        this.highScoreArea.appendChild(this.highScoreSpan);

        this.scoreSpan = document.createElement('span');
        this.scoreText = document.createElement('span');
        this.scoreArea.appendChild(this.scoreText);
        this.scoreArea.appendChild(this.scoreSpan);

        this.ammoSpan = document.createElement('span');
        this.ammoText = document.createElement('span');
        this.ammoArea.appendChild(this.ammoText);
        this.ammoArea.appendChild(this.ammoSpan);

        this.highScoreArea.style.position = 'absolute';
        this.scoreArea.style.position = 'absolute';
        this.ammoArea.style.position = 'absolute';

        this.highScoreArea.style.left = '10px';
        this.highScoreText.innerText = 'High Score: ';
        this.highScoreSpan.innerText = '0';

        this.scoreArea.style.left = '44%';
        this.scoreText.innerText = 'Score: ';
        this.scoreSpan.innerText = '0';

        this.ammoArea.style.right = '10px';
        this.ammoText.innerText = 'Ammo: ';
        this.ammoSpan.innerText = '5';

        this.gameStats.setAttribute('class', 'game-stats');
        this.gameStats.appendChild(this.highScoreArea);
        this.gameStats.appendChild(this.scoreArea);
        this.gameStats.appendChild(this.ammoArea);

        this.landingPage.appendChild(this.gameStats);
    }

    spawnMainCar() {
        this.mainCar = new Car(this.container, 89, 169, "main_car.png", 1,
            this.laneCords[this.carPointer],
            this.container.clientHeight - 190, 0, 0);
        this.mainCar.element.style.transform = "rotate(180deg)";
        this.mainCar.isMainCar = true;
        this.mainCar.element.style.transition = '0.3s ease';
        this.mainCar.draw();
        this.objects.push(this.mainCar);
        var that = this;
        var isDown = false;
        document.onkeydown = function (event) {
            if (isDown) return;
            isDown = true;
            var keyCode = event.keyCode;
            switch (keyCode) {
                case 37:
                    if (that.carPointer == 0) return;
                    that.carPointer--;
                    that.mainCar.x = that.laneCords[that.carPointer];
                    that.mainCar.rotate(135);
                    break;
                case 38:
                    //
                    break;
                case 39:
                    if (that.carPointer == (that.laneCords.length - 1)) return;
                    that.carPointer++;
                    that.mainCar.x = that.laneCords[that.carPointer];
                    that.mainCar.rotate(225);
                    break;
                case 40:
                    //
                    break;
                case 32:
                    if (that.mainCar.isRemoved) return;
                    if (that.mainCar.ammoCount <= 0) {
                        that.notify("No Ammo!");
                        return;
                    }
                    var bul = new Bullet(that.container, 50, 50, 1, undefined, undefined, 0, that.speed * 2 * -1);
                    that.objects.push(bul);
                    that.mainCar.shoot(bul);
                    that.mainCar.ammoCount--;
                    that.ammoSpan.innerText = that.mainCar.ammoCount;
                    console.log(that.mainCar.ammoCount);
                    break;
            };
            document.onkeyup = function (e) {
                isDown = false;
            }
        }
    }

    generateCars() {
        this.shuffle(this.shuffleCords);
        this.genCars = setInterval(() => {
            for (var j = 0; j < this.carCount; j++) {
                if (this.counter >= this.shuffleCords.length) {
                    this.counter = 0;
                    this.shuffle(this.shuffleCords);
                }
                var img = this.cars[Math.floor(Math.random() * this.cars.length)];
                var car = new Car(this.container, 89, 169, img, 1, this.shuffleCords[this.counter++], -200, 0, this.speed);
                car.draw();
                this.objects.push(car);
            }
            this.speed += (0.1 * ((this.isHardcore) ? 3 : 1));

        }, this.spawnTimeGap);
    }

    generatePowerUps() {
        this.genPowerUps = setInterval(() => {
            if (this.counter >= this.shuffleCords.length) {
                this.counter = 0;
                this.shuffle(this.shuffleCords);
            }
            var powerup = new Powerup(this.container, 45, 60, this.shuffleCords[this.counter++] + 12, -200, 0, this.speed);
            powerup.draw();
            this.objects.push(powerup);
        }, 6000);
    }

    moveCars() {
        var val = 0;
        this.mvCars = setInterval(() => {
            //val = val % (this.gameHeight - 5);
            this.container.style.backgroundPosition = `center ${val}px`;
            val += (this.speed - 1);
            this.objects.forEach(object => {
                if ((object.x + object.width) >= this.container.clientWidth || object.x <= 0) {
                    object.destroy();
                } else if (object.y <= -210) {
                    object.destroy();
                } else if (object.y > this.container.clientHeight) {
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
                    case "ammo":
                        this.notify("Ammo++ !");
                        this.ammoSpan.innerText = this.mainCar.ammoCount;
                        break;
                    case "shot":
                        this.increaseScore(1);
                        break;
                }

                this.checkRemovals();

                if (this.gameOver) {
                    clearInterval(this.genCars);
                    clearInterval(this.genPowerUps);
                    clearInterval(this.mvCars);
                    if (this.score > this.highScore) {
                        this.highScore = this.score;
                        this.highScoreSpan.innerText = this.highScore;
                    }
                    this.objects.forEach(object => {
                        object.remove(0);
                    });
                    this.objects = [];
                    this.speed = this.startSpeed;
                    this.carPointer = 1;
                    this.showGameoverScreen();
                };

                if (this.isHardcore) {
                    if (!object.hasFired && !object.isMainCar && !object.isBullet && object.x == this.mainCar.x && (this.mainCar.y - object.y) > 400) {
                        var bul = new Bullet(this.container, 50, 50, 1, undefined, undefined, 0, this.speed * 2);
                        object.shoot(bul);
                        this.objects.push(bul);
                        object.hasFired = true;
                    }
                }
            });
        }, 1000 / this.fps);
    }

    checkRemovals() {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].isRemoved)
                this.objects.splice(i, 1);
        }
    }

    increaseScore(value) {
        this.score += value;
        this.scoreSpan.innerText = this.score;
        if ((this.score - this.highScore) == 1 && this.highScore)
            this.notify("High Score!");
    }

    startGame() {
        this.setScoreBoard();
        this.generateGameoverScreen();
        this.spawnMainCar();
        this.generateCars();
        this.generatePowerUps();
        this.moveCars();
    }

    restartGame() {
        this.spawnMainCar();
        this.generateCars();
        this.generatePowerUps();
        this.moveCars();
    }
}

export default Game;