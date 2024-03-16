const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const dotsContainer = document.querySelector('.dots-container');

const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const pauseBtn = document.querySelector('#pauseBtn'); 

let counter = 1;
let isPaused = false;

const size = carouselImages[0].clientWidth;
let intervalId;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

nextBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    if (counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    startSlideInterval();
    updateActiveDot();
});

prevBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    startSlideInterval();
    updateActiveDot();
});

carouselSlide.addEventListener('transitionend', () => {
    if (carouselImages[counter].id === "lastClone") {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }

    if (carouselImages[counter].id === "firstClone") {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
});

function startSlideInterval() {
    intervalId = setInterval(() => {
        nextBtn.click();
        updateActiveDot();
    }, 2000);
}

startSlideInterval();

function updateActiveDot() {
    dotsContainer.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('active');
    });

    let activeDotIndex;
    if (counter === 0) {
        activeDotIndex = 0;
    } else if (counter === 4) {
        activeDotIndex = 0;
    } else {
        activeDotIndex = counter - 1;
    }
    dotsContainer.querySelectorAll('.dot')[activeDotIndex].classList.add('active');
}

carouselImages.forEach((image, i) => {
    if (i === 0 || i === carouselImages.length - 1) return;

    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
        clearInterval(intervalId);
        counter = i;
        carouselSlide.style.transition = "transform 0.4s ease-in-out";
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        startSlideInterval();

        dotsContainer.querySelectorAll('.dot').forEach(dot => {
            dot.classList.remove('active');
        });

        dot.classList.add('active');
    });
    dotsContainer.appendChild(dot);
});

dotsContainer.querySelector('.dot').classList.add('active');

pauseBtn.addEventListener('click', () => {
    if (isPaused) {
        startSlideInterval();
        pauseBtn.classList.remove('fa-play');
        pauseBtn.classList.add('fa-pause');
    } else {
        clearInterval(intervalId);
        pauseBtn.classList.remove('fa-pause');
        pauseBtn.classList.add('fa-play');
    }
    isPaused = !isPaused;
});
