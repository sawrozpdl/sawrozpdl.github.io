import Game from './Game.js';

var gameContainer = document.getElementsByClassName('game-container')[0];
var game = new Game(gameContainer, 50, 30, 30, 1, 60);
game.generateBoxes();
game.moveBoxes();
game.initAwareness();


