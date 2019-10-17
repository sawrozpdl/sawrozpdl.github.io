import Game from './Game.js';

var gameContainer = document.getElementsByClassName('game-container')[0];
var game = new Game(gameContainer, 10, 20, 10, 10, 0.02, 60);
game.generateBoxes();
game.moveBoxes();


