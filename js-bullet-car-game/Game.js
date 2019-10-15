import Car from './Car.js';
import Bullet from './Bullet.js';
import Powerup from './Powerup.js';

class Game {

    constructor(container, isHardcore, speed, carCount, spawnTimeGap, fps) {
        this.container = container;
        this.isHardcore = isHardcore;
        this.speed = speed;
        this.carCount = carCount;
        this.spawnTimeGap = spawnTimeGap;
        this.fps = fps;

        this.overtakeCount = 0;
        this.gameHeight = 700;
        this.scoreHeight = 60;
        this.gameOver = false;

        this.cars = ["blue_car.png", "green_car.png", "orange_car.png", "police_car.png", "mini_van.png", "truck.png", "mini_truck.png", "taxi_car.png", "red_car.png", "yellow_car.png", "white_car.png"];
        this.laneCords = [150, 280, 410];
        //this.laneCords = [190, 325, 475, 612, 766, 917];
        this.shuffleCords = [150, 280, 410];
        this.carPointer = 2;
        this.objects = [];
        this.mainCar = null;

        this.container.style.width = '100%';
        this.container.style.height = `${this.gameHeight}px`;
        this.container.style.margin = `${this.scoreHeight}px auto 0px auto`;
        this.container.style.background = 'url("./images/road.png")';
        this.container.style.backgroundPosition = 'center 0px';
        this.container.style.backgroundSize = 'cover';
        this.container.style.overflow = 'hidden';
        this.container.style.position = 'relative';

        this.landingPage = null;
        this.gameName = null;
        this.playButton = null;
        this.scoreArea = null;
        this.notifier = null;
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


        this.gameName = document.createElement('img');
        this.gameName.setAttribute('src', './images/texts/bullet-car.png');
        this.landingPage.appendChild(this.gameName);
        this.playButton = document.createElement('img');
        this.playButton.setAttribute('src', './images/texts/play.png');
        this.playButton.onclick = () => {this.startGame();}
        this.landingPage.appendChild(this.playButton);

        this.container.parentNode.appendChild(this.landingPage);
    }

    generateGameoverScreen() {

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

        this.scoreArea = document.createElement('div');
        this.landingPage.style.height = `${this.scoreHeight}px`;

        this.landingPage.appendChild(this.scoreArea);
    }

    spawnMainCar() {
        this.mainCar = new Car(this.container, 89, 169, "main_car.png", 1,
            this.laneCords[2],
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
                    console.log(that.mainCar.ammoCount);
                    break;
            };
            document.onkeyup = function(e) {
                isDown = false;
            }
        }
    }

    generateCars() {
        this.shuffle(this.shuffleCords);
        var i = 0;
        const genCars = setInterval(() => {
            for (var j = 0; j < this.carCount; j++) {
                if (i >= this.shuffleCords.length) {
                    i = 0;
                    this.shuffle(this.shuffleCords);
                }
                var img = this.cars[Math.floor(Math.random() * this.cars.length)];
                var car = new Car(this.container, 89, 169, img, 1, this.shuffleCords[i++], -200, 0, this.speed);
                car.draw();
                this.objects.push(car);
            }
            this.speed += 0.1;

            if (this.gameOver) clearInterval(genCars);

        }, this.spawnTimeGap);
    }

    generatePowerUps() {
        const genPowerUps = setInterval(() => {
            var powerup = new Powerup(this.container, 45, 60, this.shuffleCords[1] + 12, -200, 0,  this.speed);
            powerup.draw();
            this.objects.push(powerup);
        }, 6000);
    }

    moveCars() {
        var val = 0;
        const mvCars = setInterval(() => {
            val = val % 1000;
            this.container.style.backgroundPosition = `center ${val}px`;
            val += (this.speed - 1);
            this.objects.forEach(object => {
                if ((object.x + object.width) >= this.container.clientWidth || object.x <= 0) {
                    object.destroy();
                } else if (object.y <= -210) {
                    object.destroy();
                } else if (object.y > this.container.clientHeight) {
                    object.remove(0);
                    this.overtakeCount++;
                } else
                    object.move();

                var check = object.checkCollision(this.objects);

                switch(check) {
                    case "gameover":
                        this.gameOver = true;
                        break;
                    case "ammo":
                        this.notify("+2 Ammo!");
                }

                this.checkRemovals();

                if (this.gameOver) {
                    clearInterval(mvCars);
                    this.generateGameoverScreen();
                };

                if (this.isHardcore) {
                    if (!object.hasFired && !object.isMainCar && !object.isBullet && object.x == this.mainCar.x && (this.mainCar.y - object.y) > 500) {
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

    startGame() {
        this.setScoreBoard();
        this.spawnMainCar();
        this.generateCars();
        this.generatePowerUps();
        this.moveCars();
    }
}

export default Game;