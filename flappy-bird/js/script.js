import Game from './Game.js';

var gameContainer = document.getElementsByClassName('game-container')[0];
var game = new Game(gameContainer, 2, 4, 37.5, 60);
game.startGame();


// var gameContainer1 = document.getElementsByClassName('game-container')[1];
// var game1 = new Game(gameContainer1, 2, 4, 37.5, 60);
// game1.startGame();