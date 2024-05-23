const hero =    document.querySelector('.hero');
const slider =  document.querySelector('.slider');
const logo =    document.querySelector('#logo');
const navLinks = document.querySelector('.nav-links');
const headline = document.querySelector('.headline');
const nav =     document.querySelector('nav');

const tl = new TimelineMax();

tl  .fromTo(slider, 1, {x: "-100%"}, {x: "0%", ease: Power2.easeOut})
    .fromTo(hero, 0.5, {opacity: 0}, {opacity: 1, ease: Expo.easeInOut})
    .fromTo(hero, 1, {height: "0%"}, {height: "80%", ease: Bounce.easeOut}, "-=0.5")
    .fromTo(hero, 1, {width: "100%"}, {width: "80%", ease: Power2.easeInOut})
    .fromTo(logo, 0.5, {opacity: 0, x: 30}, {opacity: 1, x: 0}, "-=0.5")
    .fromTo(nav, 1, {x: "-100%"}, {x: "0%", ease: Power2.easeOut}, "-=1")
    .fromTo(navLinks, 1, {opacity: 0, x: 30}, {opacity: 1, x: 0}, "-=0.5")
    .fromTo(headline, 1, {opacity: 0, x: -200}, {opacity: 1, x: -100}, "-=1");