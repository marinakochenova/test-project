const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;
let slideCount = slideElements.length;
let visibleSlides = getVisibleSlides();

const firstClones = [];
const lastClones = [];

for (let i = 0; i < visibleSlides; i++) {
    firstClones.push(slideElements[i].cloneNode(true));
    lastClones.push(slideElements[slideCount - 1 - i].cloneNode(true));
}

firstClones.forEach(clone => slides.appendChild(clone));
lastClones.reverse().forEach(clone => slides.insertBefore(clone, slides.firstChild));

updateSlidePosition();

window.addEventListener('resize', () => {
    visibleSlides = getVisibleSlides();
    updateSlidePosition();
});

function updateSlidePosition() {
    const slideWidth = slides.clientWidth / visibleSlides;
    slides.style.transform = `translateX(-${slideWidth * visibleSlides}px)`;
}

function getVisibleSlides() {
    if (window.innerWidth <= 570) return 1; // Mobile
    if (window.innerWidth <= 768) return 2; // Tablet
    return 3; // Desktop
}

function moveToSlide(index) {
    const slideWidth = slides.clientWidth / visibleSlides;
    slides.style.transition = 'transform 0.5s ease-in-out';
    slides.style.transform = `translateX(-${(index + visibleSlides) * slideWidth}px)`;

    currentIndex = index;

    slides.addEventListener('transitionend', () => {
        if (currentIndex < 0) {
            slides.style.transition = 'none';
            currentIndex = slideCount - visibleSlides;
            slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        if (currentIndex >= slideCount) {
            slides.style.transition = 'none';
            currentIndex = 0;
            slides.style.transform = `translateX(-${visibleSlides * slideWidth}px)`;
        }
    }, { once: true });
}

prevButton.addEventListener('click', () => {
    moveToSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
    moveToSlide(currentIndex + 1);
});

setInterval(() => {
    moveToSlide(currentIndex + 1);
}, 4000);

    

if (window.innerWidth <= 530) {
    const links = document.querySelectorAll('.hero-btns a');

    links.forEach(link => {
        const breaks = link.getElementsByTagName('br');

        Array.from(breaks).forEach(br => br.remove());
    });

    const stSlides = document.querySelector('.step-slides');
    const stSlideElements = document.querySelectorAll('.step-slide');
    const stPrevButton = document.getElementById('step-prev');
    const stNextButton = document.getElementById('step-next');
    const pagination = document.getElementById('pagination');

    let stCurrentIndex = 0;

    stSlideElements.forEach((_, index) => {
        const dot = document.createElement('div');
        
        dot.classList.add('dot');
        if (index === stCurrentIndex) dot.classList.add('active');
        dot.dataset.index = index;
        pagination.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function stUpdateSlider() {
        stSlides.style.transform = `translateX(-${stCurrentIndex * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[stCurrentIndex].classList.add('active');
        stPrevButton.disabled = stCurrentIndex === 0;
        stNextButton.disabled = stCurrentIndex === stSlideElements.length - 1;
    }

    function stMoveToSlide(index) {
        stCurrentIndex = index;
        stUpdateSlider();
    }

    stPrevButton.addEventListener('click', () => {
        if (stCurrentIndex > 0) stMoveToSlide(stCurrentIndex - 1);
    });

    stNextButton.addEventListener('click', () => {
        if (stCurrentIndex < stSlideElements.length - 1) stMoveToSlide(stCurrentIndex + 1);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index, 10);
            stMoveToSlide(index);
        });
    });
    stUpdateSlider();

}



