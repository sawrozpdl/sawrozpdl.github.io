class GameOver {

    constructor(game) {
        this.container = game.container;
        this.game = game;
        this.medal = null;
        this.score = 0;
        this.bestScore = 0;

        this.element = document.createElement('div');
        this.container.appendChild(this.element);
        this.element.style.position = 'absolute';
        this.element.style.width = '100%';
        this.element.style.height = '100%';

        this.element.style.transition = '0.5s ease';
        this.element.style.transform = 'scale(0)';
        this.element.style.opacity = '0';

        this.element.style.background = "url('./images/game-over.png')";
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.backgroundPosition = 'center 70%';

        this.startButton = document.createElement('span');
        this.startButton.style.position = 'absolute';
        this.startButton.style.bottom = '13%';
        this.startButton.style.left = '42.5%';
        this.startButton.style.width = '85px';
        this.startButton.style.height = '25px';
        this.element.appendChild(this.startButton);

        this.medalSpan = document.createElement('div');
        this.medalSpan.style.background = "url('./images/medal-sprite.png')";
        this.medalSpan.style.backgroundPosition = '0px 0px';
        this.scoreSpan = document.createElement('span');
        this.bestScoreSpan = document.createElement('span');
        this.scoreSpan.setAttribute('class', 'score-text');
        this.bestScoreSpan.setAttribute('class', 'score-text');

    }

    setStats() {
        this.medal = this.game.medal;
        this.score = this.game.score;
        this.bestScore = this.game.bestScore;
    }

    populate() {
        this.medalSpan.style.backgroundPosition = `${this.medal.x * 25}% ${this.medal.y * 25}%`;
        this.scoreSpan.innerText = this.score;
        this.bestScoreSpan.innerText = this.bestScore;
    }

    onclick(func) {
        this.startButton.onclick = () => {func()};
    }

    show() {
        this.element.style.transform = 'scale(1)';
        this.element.style.opacity = '1';
    }

    hide() {
        this.element.style.transform = 'scale(0)';
        this.element.style.opacity = '0'; 
    }


}

export default GameOver;