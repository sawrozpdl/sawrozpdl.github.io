import Game from './Game.js';

var gameContainer = document.getElementsByClassName('game-container')[0];
var game = new Game(gameContainer, 4, 2, 2000, 60);
game.generateLandingScreen();
game.startGame();



