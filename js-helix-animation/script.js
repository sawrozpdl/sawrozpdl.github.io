import Game from './Game.js';

var gameContainer = document.getElementsByClassName('game-container')[0];
var game = new Game(gameContainer, 50, 10, 10, 1, 60);
game.generateBoxes();
game.moveBoxes();


