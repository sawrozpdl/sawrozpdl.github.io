import Game from './Game.js';

var gameContainer = document.getElementsByClassName('game-container')[0];
var game = new Game(gameContainer, 3, 1, 2500, 60);
game.movePipes();
//game.generateLandingScreen();