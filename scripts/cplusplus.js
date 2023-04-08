const visualContainer = document.querySelectorAll('.visual-container');

visualContainer.forEach((container) => {
    container.addEventListener('mouseenter', () => {
        const videoContainer = container.querySelector('.video-container');
        container.classList.add('background-disappear');
        videoContainer.classList.add('appear');
    });
    container.addEventListener('mouseleave', () => {
        const videoContainer = container.querySelector('.video-container');
        container.classList.remove('background-disappear');
        videoContainer.classList.remove('appear');
    });
});

const pageSliderContainer = document.querySelector('.page-slider-container');
const pageSlider = document.querySelector('.page-slider');

const projectContainers = document.querySelectorAll('.project-container');

window.onload = function() {
    projectContainers.forEach((container) => {
        container.classList.add('show');
    });
};

const backBtn = document.querySelector('.back-button');

backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    setTimeout(() => {
        window.location.href = backBtn.getAttribute('href');
    }, 2000);
    pageSliderContainer.classList.add('index');
    pageSlider.classList.add('transition');
});