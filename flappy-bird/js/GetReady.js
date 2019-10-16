class GetReady {

    constructor(container) {
        this.container = container;
        this.medal = null;
        this.score = null;
        this.bestScore = null;

        this.element = document.createElement('div');
        this.container.appendChild(this.element);
        this.element.style.position = 'absolute';
        this.element.style.width = '100%';
        this.element.style.height = '100%';

        this.element.style.transition = '0.5s ease';
        this.element.style.transform = 'scale(0)';
        this.element.style.opacity = '0';

        this.element.style.background = "url('./images/get-ready.png')";
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.backgroundPosition = 'center 70%';

    }

    onclick(func) {
        this.element.onclick = () => {func()};
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

export default GetReady;