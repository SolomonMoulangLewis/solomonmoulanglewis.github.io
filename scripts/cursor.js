//----------------------------------------------------
//CURSOR
const cursor = document.querySelector('.cursor');

document.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
  let x = e.clientX;
  let y = e.clientY;

  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
}

//----------------------------------------------------
//CURSOR HOVERABLES
const hoverables = document.querySelectorAll(".hoverable");

hoverables.forEach((hoverable) => {
    hoverable.addEventListener("mouseover", () => {
      cursor.classList.add("grow");
    });
    hoverable.addEventListener("mouseleave", () => {
      cursor.classList.remove("grow");
    });
});