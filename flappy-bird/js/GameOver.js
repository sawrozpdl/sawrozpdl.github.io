class GameOver {

    constructor(game) {
        this.container = game.gameCanvas;
        this.game = game;
        this.medal = null;
        this.score = 0;
        this.bestScore = 0;

        this.element = document.createElement('div');
        this.container.appendChild(this.element);
        this.element.style.position = 'absolute';
        this.element.style.zIndex = '2';
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
        this.medalSpan.style.width = '45px';
        this.medalSpan.style.height = '45px';
        this.scoreSpan = document.createElement('span');
        this.bestScoreSpan = document.createElement('span');
        this.scoreSpan.setAttribute('class', 'score-text');
        this.bestScoreSpan.setAttribute('class', 'score-text');

        this.medalSpan.style.position = 'absolute';
        this.scoreSpan.style.position = 'absolute';
        this.bestScoreSpan.style.position = 'absolute';

        this.medalSpan.style.top = '54.5%';
        this.medalSpan.style.left = '35.5%';
        this.scoreSpan.style.top = '53%';
        this.scoreSpan.style.left = '62%';
        this.bestScoreSpan.style.top = '64%';
        this.bestScoreSpan.style.left = '62%';

        this.element.appendChild(this.medalSpan);
        this.element.appendChild(this.scoreSpan);
        this.element.appendChild(this.bestScoreSpan);
    }

    setStats() {
        this.medal = this.game.medal;
        this.score = this.game.score;
        this.bestScore = this.game.bestScore;
        this.populate();
    }

    populate() {
        this.medalSpan.style.backgroundPosition = `${this.medal.x * 45}px ${this.medal.y * 45}px`;
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