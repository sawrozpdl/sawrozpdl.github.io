import Game from './Game.js';

var gameContainer = document.getElementsByClassName('game-container')[0];
var game = new Game(gameContainer, 20, 40, 1, 60);
game.generateAnts();
game.moveAnts();
game.initAwareness();


