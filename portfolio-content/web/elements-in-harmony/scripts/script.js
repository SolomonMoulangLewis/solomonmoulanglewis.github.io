/* 
    PROJECT ANIMATIONS
*/

//Variables holding html elements
const header = document.querySelector("header");
const logoSVG = document.querySelector("#logo-svg");
const titleText = document.querySelector("#title");
const mainContentContainer = document.querySelector(".main-content-container");
const inputContainer = document.querySelector(".input-container");
const sketchHolder = document.querySelector("#sketch-holder");
const footer = document.querySelector("footer");
const inputTitle = document.querySelector("#input-title");
const author = document.querySelector("#author");
const apiText = document.querySelector("#openweathermap");

//Creates instance of the TimlineMax animation library
const tl = new TimelineMax();

//Once window has loaded -> runs animation
window.onload = function () {
  tl
    //Logo and Text
    .fromTo(logoSVG, 1, { x: "400%" }, { x: "100%", ease: Power2.easeInOut })
    .fromTo(
      logoSVG,
      1,
      { opacity: 0 },
      { opacity: 1, ease: Power2.easeInOut },
      "-=1"
    )
    .to(logoSVG, 1, { x: "0%", ease: Power2.easeInOut })
    .fromTo(
      titleText,
      1,
      { x: "100%" },
      { x: "0%", ease: Power2.easeInOut },
      "-=1"
    )
    .fromTo(
      titleText,
      1,
      { opacity: 0 },
      { opacity: 1, ease: Power2.easeInOut },
      "-=1"
    )

    //Author
    .fromTo(author, 0.5, { opacity: 0 }, { opacity: 1, ease: Power2.easeOut })
    .fromTo(
      author,
      0.2,
      { y: "200%" },
      { y: "0%", ease: Power2.easeOut },
      "-=0.5"
    )
    .fromTo(
      author,
      1,
      { fontSize: "1.2rem" },
      { fontSize: "3rem", ease: Bounce.easeOut },
      "-=0.5"
    )

    .fromTo(
      header,
      2,
      { height: "50vh" },
      { height: "10vh", ease: Power2.easeOut }
    )
    .fromTo(
      footer,
      2,
      { y: "-70%", height: "65vh" },
      { y: "0%", height: "10vh", ease: Power2.ease },
      "-=2"
    )
    .to(author, 1, { fontSize: "1.2rem", ease: Power2.ease }, "-=2")

    .fromTo(
      apiText,
      0.5,
      { opacity: 0 },
      { opacity: 1, ease: Power2.ease },
      "-=0.5"
    )

    .fromTo(
      inputTitle,
      1,
      { fontSize: "1.6rem" },
      { fontSize: "2rem", ease: Power2.easeInOut }
    )
    .to(inputTitle, 1, { fontSize: "1.6rem", ease: Power2.easeInOut });
};

//Function runs once user has entered Location
function moveHeaderFooter() {
  tl.fromTo(header, 2, { y: "0%" }, { y: "-100%", ease: Power2.easeOut })
    .fromTo(footer, 2, { y: "0%" }, { y: "100%", ease: Power2.easeOut }, "-=2")
    .fromTo(
      mainContentContainer,
      2,
      { y: "0%" },
      { y: "-200%", ease: Power2.easeInOut },
      "-=2"
    );
}
