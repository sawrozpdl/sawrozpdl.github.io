function Carousel(container, width, isResponsive, delay, direction, fps, speed) {

    this.mainContainer = container;
    this.imageWrapper = this.mainContainer.getElementsByClassName('carousel-image-wrapper')[0];
    this.WIDTH = width;
    this.isResponsive = isResponsive;
    this.IMAGE_STAY = delay;
    this.FRAME_PER_SECOND = fps;
    this.SLIDE_DIRECTION = direction;
    this.SPEED = speed;
    this.WIDTH_RATE = 10 * this.SPEED;

    this.indexArea = null;
    this.arrowNext = null;
    this.arrowPrev = null;

    var imageCount = 0;
    var imageWidth = 0;
    var imageHeight = 0;
    var wrapperWidth = 0;
    var spanFont = 1;
    var isSliding = false;
    var left = 0;
    var position = 0;
    var images = this.imageWrapper.getElementsByTagName('img');

    this.init = function () {

        this.mainContainer.style.position = 'relative';
        this.imageWrapper.style.position = 'absolute';
        this.imageWrapper.style.left = '0px'; // IMP
        this.imageWrapper.classList.add('clearfix');
        this.mainContainer.style.overflow = 'hidden';
        this.mainContainer.classList.add('clearfix');


        this.arrowPrev = document.createElement('span');
        this.arrowNext = document.createElement('span');
        this.arrowPrev.setAttribute('class', 'fa fa-arrow-left arrowPrev');
        this.arrowNext.setAttribute('class', 'fa fa-arrow-right arrowNext');
        this.mainContainer.appendChild(this.arrowPrev);
        this.mainContainer.appendChild(this.arrowNext);

        this.indexArea = document.createElement('div');
        this.indexArea.style.position = 'absolute'
        this.indexArea.style.bottom = '5px';
        this.mainContainer.appendChild(this.indexArea);

        imageWidth = images[0].naturalWidth;
        imageHeight = images[0].naturalHeight;
        imageCount = images.length;
        spanFont = imageHeight / 16;
        for (var foot = 0; foot < imageCount; foot++) {
            var temp = document.createElement('div');
            temp.setAttribute('id', 'index' + foot);
            temp.style.display = 'inline-block';
            temp.setAttribute('index', foot);
            this.indexArea.appendChild(temp);
        }

        this.indexArea.childNodes[0].classList.add('active');
    }.bind(this);

    this.startStuff = function () {

        for (var i = 0; i < images.length; i++) {
            element = images[i];
            element.style.float = 'left';
            if (this.WIDTH != 0) {
                imageWidth = this.WIDTH;
                imageHeight = this.WIDTH * (element.naturalHeight / element.naturalWidth);
                element.style.width = imageWidth + 'px';
                element.style.height = imageHeight + 'px';
            }
            wrapperWidth += imageWidth;
        }

        spanFont = imageHeight / 16;

        this.mainContainer.style.width = imageWidth + 'px';
        this.mainContainer.style.height = imageHeight + 'px'; //imp   
        this.imageWrapper.style.width = wrapperWidth + 'px';
        this.imageWrapper.style.height = imageHeight + 'px';

        this.arrowPrev.style.fontSize = spanFont;
        this.arrowNext.style.fontSize = spanFont;
        this.arrowPrev.style.padding = `${spanFont / 2}px ${spanFont / 2}px`;
        this.arrowNext.style.padding = `${spanFont / 2}px ${spanFont / 2}px`;
        this.arrowPrev.style.top = ((imageHeight - spanFont * 2) / 2) + 'px';
        this.arrowNext.style.top = this.arrowPrev.style.top;
        this.indexArea.style.left = ((imageWidth - spanFont * (2 * imageCount - 1) / 2) / 2) + 'px';
        var count = 0;
        var autoSlide = setInterval(function () {
            if (this.SLIDE_DIRECTION == 0) return;
            var autoClick = (this.SLIDE_DIRECTION == -1) ? this.arrowPrev : this.arrowNext;
            if (count++ == this.IMAGE_STAY) autoClick.click();
        }.bind(this), 1000);

        this.arrowPrev.onclick = function () {
            if (isSliding) return;
            if (position == 0)
                position = imageCount - 1;
            else --position;
            slide();
        }

        this.arrowNext.onclick = function () {
            if (isSliding) return;
            if (position == (imageCount - 1))
                position = 0;
            else ++position
            slide();
        }

        var that = this;

        var slide = function () {
            var destination = -1 * position * imageWidth;
            if (left == destination) return;
            var direction = 1;
            if (left > destination)
                direction = -1;
            isSliding = true;
            left += (destination - left) % that.WIDTH_RATE; // keep in sync
            var anim = setInterval(function () {
                left += direction * that.WIDTH_RATE;
                that.imageWrapper.style.left = left + 'px';
                if (left == destination) {
                    clearInterval(anim);
                    isSliding = false;
                    count = 0;
                }
            }.bind(this), 1000 / this.FRAME_PER_SECOND);
            updateIndices();
        }

        for (var j = 0; j < imageCount; j++) {
            var temp = this.indexArea.childNodes[j];
            temp.style.width = (spanFont / 2) + 'px';
            temp.style.height = (spanFont / 2) + 'px';
            temp.style.marginRight = (spanFont / 2) + 'px';
            temp.onclick = function () {
                if (isSliding) return;
                position = this.getAttribute('index');
                slide();
            };
        }
    }.bind(this);

    var that = this;

    function updateIndices() {
        that.indexArea.childNodes.forEach(node => {
            if (node.getAttribute('index') == position)
                node.classList.add('active');
            else
                node.classList.remove('active');
        });
    }

    this.init();
    this.startStuff();

    this.resize = function () {
        if (!this.isResponsive) return;
        this.WIDTH = this.mainContainer.parentElement.clientWidth;
        this.startStuff();
    }

    window.onresize = function () { //in case of single sliders in a dom, this does the work
        this.resize();
    }.bind(this);
}

var containers = document.getElementsByClassName('carousel-container');
var carousels = [];
for (var i = 0; i < containers.length; i++) {
    var temp = ((i + 1) % 2 == 0) ? 1 : -1;
    carousels[i] = new Carousel(containers[i], containers[i].parentNode.clientWidth, true, 2 + temp, temp, 60, 1);
}

window.onresize = function () { // window. can be used only once so one for everyone
    carousels.forEach(carousel => {
        carousel.resize()
    });
}