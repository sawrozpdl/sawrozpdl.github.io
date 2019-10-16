import Game from './Game.js';

var gameContainer = document.getElementsByClassName('game-container')[0];
var game = new Game(gameContainer, 2, 1, 2500, 60);
game.startGame();
// game.spawnBird();
// game.movePipes();
//game.generateLandingScreen();