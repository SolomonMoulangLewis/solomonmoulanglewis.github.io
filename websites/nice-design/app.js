const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
  let x = e.clientX;
  let y = e.clientY;

  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
}

const hoverables = Array.from(document.querySelectorAll(".hoverable"));

hoverables.forEach((hoverable) => {
  hoverable.addEventListener("mouseover", () => {
    cursor.classList.add("grow");
  });
  hoverable.addEventListener("mouseleave", () => {
    cursor.classList.remove("grow");
  });
});

const homeContainer = document.querySelector('.home');
const discoverContainer = document.querySelector('.discover');
const discoverLink = document.querySelector('#discover-link');

discoverLink.addEventListener('mouseover', () => {
  discoverContainer.classList.add('discover-active');
  homeContainer.classList.add('discover-active');
});

discoverLink.addEventListener('mouseleave', () => {
  discoverContainer.classList.remove('discover-active');
  homeContainer.classList.remove('discover-active');
});