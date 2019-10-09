import Game from './Game.js';

var gameContainer = document.getElementsByClassName('game-container')[0];
var game = new Game(gameContainer, 3, 40, 1, 60);
game.generateScoreBoard();
game.generateAnts();
game.moveAnts();


