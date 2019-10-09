import Game from './Game.js';

var gameContainer = document.getElementsByClassName('game-container')[0];
var game = new Game(gameContainer, 80, 25, 25, 1, 60);
game.generateBoxes();
game.moveBoxes();
game.initDev();


