class GameScreen {

    constructor(container,  title) {
        this.container = container;
        this.title = title;

        this.element = document.createElement('div');
        this.element.style.width = '100%';
        this.element.style.height = '100%';
    }
}

export default GameScreen;