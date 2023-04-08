const webContainers = document.querySelectorAll('.web-container');

window.onload = () => {
    webContainers.forEach((container) => {
        container.classList.add('show');
    });
}

const backBtn = document.querySelector('.back-button');

const pageSliderContainer = document.querySelector('.page-slider-container');
const pageSlider = document.querySelector('.page-slider')

backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    setTimeout(() => {
        window.location.href = backBtn.getAttribute('href');
    }, 2000);
    pageSliderContainer.classList.add('index');
    pageSlider.classList.add('transition');
});