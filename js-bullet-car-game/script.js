import Game from './Game.js';

var gameContainer = document.getElementsByClassName('game-container')[0];
var game = new Game(gameContainer, 60);
game.spawnMainCar();
game.generateCars();
game.moveCars();



