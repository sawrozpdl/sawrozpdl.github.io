import Car from './Car.js';
import Bullet from './Bullet.js';

class Game {

    constructor(container, fps) {
        this.container = container;
        this.fps = fps;

        this.cars = ["blue_car.png", "green_car.png", "orange_car.png", "police_black.gif", "police_white.gif", "red_car.png", "yellow_car.png", "white_car.png"];
        this.objects = [];

        this.container.style.background = 'url("./road.png")';
        this.container.style.backgroundPosition = 'center 0px';
        this.container.style.overflow = 'hidden';
        this.container.style.position = 'relative';
        this.scoreContainer = null;
        
    }

    generateScoreBoard() {
        this.scoreContainer.style.position = 'absolute';
        this.scoreContainer.style.width = '100%';
        this.scoreContainer.style.top = "0px";
        this.scoreContainer.style.height = '80px';
        this.container.appendChild(scoreContainer);
    }

    spawnMainCar() {  
        var keanu = new Car(this.container, 89, 169, "main_car.png", 1, 
                                this.container.clientWidth / 2 - 45,
                                this.container.clientHeight - 180, 0, 0);
        keanu.element.style.right = "10px";
        keanu.element.style.transition = '0.5s ease';
        keanu.draw();
        this.objects.push(keanu);
        var that = this;
        document.onkeydown = function(event) {
            var keyCode = event.keyCode;
            switch (keyCode) {
              case 37:
                keanu.x -= 50;
                keanu.rotate(-45);
                break;
              case 38:
                keanu.y -= 50;
                keanu.rotate(0);
                break;
              case 39:
                keanu.x += 50;
                keanu.rotate(45);
                break;
              case 40:
                keanu.y += 50;
                keanu.rotate(0);
                break;
              case 32:
                  var bul = new Bullet(that.container, 50, 50, 1, undefined, undefined, 0, -6);
                  that.objects.push(bul);
                  keanu.shoot(bul);
                break;
               
            };
          }
    }

    generateCars() {
        var i = 2;
        setInterval(() => {
           var temp = Math.ceil(1 + Math.random() * 2);
           var img = this.cars[Math.floor(Math.random() * this.cars.length)];
           var car = new Car(this.container, 89, 169, img, 1, this.container.clientWidth / temp, -200, 0, 4);
           car.draw();
           this.objects.push(car);
           i++;
           i = i % 200;
       }, 1500); 
    }

    moveCars() {
        var val = 0;
        setInterval(() => {
            val = val % 1000;
            this.container.style.backgroundPosition = `center ${val}px`;
            val += 3;
            this.objects.forEach(object => {
                if ((object.x + object.width) >= this.container.clientWidth || object.x <= 0) {
                    object.destroy();
                } else if (object.y <= -210) {
                    object.destroy();
                } else if (object.y > this.container.clientHeight) {
                    object.remove(0);
                }
                else 
                    object.move();

                object.checkCollision(this.objects);

                this.checkCollisions();
            });
        }, 1000 / this.fps);
    }

    checkCollisions() {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].isRemoved)
                this.objects.splice(i, 1);
        }
    }
}

export default Game;