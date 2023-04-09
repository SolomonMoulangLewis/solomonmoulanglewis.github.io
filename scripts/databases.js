const projects = document.querySelectorAll('.project-container');

window.onload = function() {
    projects.forEach((project) => {
        project.classList.add('show');
    });
}

const backBtn = document.querySelector('.back-button');
const pageSliderContainer = document.querySelector('.page-slider-container');
const pageSlider = document.querySelector('.page-slider');

backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    setTimeout(() => {
        window.location.href = backBtn.getAttribute('href');
    }, 2000);
    pageSliderContainer.classList.add('index');
    pageSlider.classList.add('transition');
});