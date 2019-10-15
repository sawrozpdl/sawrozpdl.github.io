import Game from './Game.js';

var gameContainer = document.getElementsByClassName('game-container')[0];
var game = new Game(gameContainer, 4, 1, 1700, 60);
game.generateLandingScreen();



