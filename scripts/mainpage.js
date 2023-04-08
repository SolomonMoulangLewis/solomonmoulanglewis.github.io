//----------------------------------------------------
//INITIAL ANIMATION

const titleContainer = document.querySelector('.title-container');
const author = document.querySelector('#author');
const skills = document.querySelector('#skills');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll(".nav-link");
const slider = document.querySelector('.slider');
//aboutMe
const aboutMe = document.querySelector('#about-me');
const aboutMeTitle = document.querySelector('#hi');
const aboutMeText1 = document.querySelector('#about-me-text1');
const aboutMeText2 = document.querySelector('#about-me-text2');
const aboutMeText3 = document.querySelector('#about-me-text3');

const projectSection = document.querySelector('#projects-section');
const projectSectionTitle = document.querySelector('#projects-section-title');

const mainProjectsContainer = document.querySelector('#main-projects-container');

const tl = new TimelineMax();

tl  .fromTo(slider, 4, {y: "100%"}, {y: "0%", ease: Power2.ease})
    /* .fromTo(skills, 1, {x: "-100%"}, {x: "0%", ease: Power2.ease}, "-=0.5") */
    .fromTo(skills, 1, {opacity: 0}, {opacity: 1, ease: Power2.ease})
    .fromTo(navList, 2, {opacity: "0"}, {opacity: "1", ease: Power2.ease}, "-=2")
    .fromTo(author, 1, {x: "-100%"}, {x: "0%", ease: Power2.ease}, "-=1.5")
    .fromTo(author, .5, {opacity: 0}, {opacity: 1, ease: Power2.easeOut}, "-=0.5")
    .fromTo(aboutMeTitle, 1, {x: "100%", opacity: 0}, {x: "0%", opacity: 1, ease: Power2.ease}, "-=1.2")
    .fromTo(aboutMeText1, 1.2, {x: "100%", opacity: 0}, {x: "0%", opacity: 1, ease: Power2.ease}, "-=1.2")
    .fromTo(aboutMeText2, 1.2, {x: "100%", opacity: 0}, {x: "0%", opacity: 1, ease: Power2.ease}, "-=1.2")
    .fromTo(aboutMeText3, 1.2, {x: "100%", opacity: 0}, {x: "0%", opacity: 1, ease: Power2.ease}, "-=1.2")
;

//----------------------------------------------------
//Title move on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    aboutMeTitle.style.left = `${scrollPosition * 0.8}px`;
    aboutMeTitle.style.fontSize = `${6 + (scrollPosition * 0.1)}rem`
    aboutMeText1.style.top = `${scrollPosition * 0.2}px`;
    aboutMeText2.style.top = `${scrollPosition * 0.3}px`;
    aboutMeText3.style.top = `${scrollPosition * 0.4}px`;
    aboutMeTitle.style.opacity = `${1 - (scrollPosition * 0.0029)}`;

    projectSection.style.left = `${100 + (scrollPosition * -0.2)}vw`;
    projectSection.style.top = `${100 + (scrollPosition * -0.1)}vh`;
    projectSection.style.borderRadius = `${scrollPosition * 0.1}em`;
    projectSectionTitle.style.left = `${-950 + (scrollPosition * 1.2)}px`;
    projectSectionTitle.style.opacity = `${-1.4 + (scrollPosition * 0.0029)}`;

    mainProjectsContainer.style.opacity = `${-1.4 + (scrollPosition * 0.0029)}`;
});

//----------------------------------------------------
//INTERSECTION OBSERVER

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
                    link.style.color = "#f4f4f4";
                });
            } else {
                navLinks.forEach((link) => {
                    link.style.color = "#000";
                });
            }
      });
    },
    {
        threshold: 0.2,
    }
);

observer.observe(projectSection);

/* const projectTL = new TimelineMax();

const mainProjectsContainer = document.querySelector('#main-projects-container');

const projectObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                projectTL.fromTo(mainProjectsContainer, 2, {opacity: 0}, {opacity: 1, ease: Power2.ease});
            } else {
                projectTL.fromTo(mainProjectsContainer, 2, {opacity: 1}, {opacity: 0, ease: Power2.ease});
            }
        });
    },
    {
        threshold: 1.0,
    }
); */

/* projectObserver.observe(mainProjectsContainer); */

//----------------------------------------------------
//NAV LINKS ANIMATION

navLinks.forEach((navlink) => {
    const navName = navlink.innerHTML;
    const navSplit = navName.split("");
    navlink.textContent = "";
  
    for (var i = 0; i < navSplit.length; i++) {
        const span = document.createElement('span');
        span.textContent = navSplit[i];
        navlink.appendChild(span);
    }
  
    let mouseout = null;
  
    function addclass() {
      var timer = setInterval(onTick, 50);
      var counter = 0;
  
      function onTick() {
        const spans = navlink.querySelectorAll("span")[counter];
        spans.classList.add("fade");
        counter++;
        if (counter === navSplit.length) {
          clearInterval(timer);
          counter = 0;
        }
      }
    }
  
    function removeClass() {
      const spans = Array.from(document.querySelectorAll("span"));
      spans.forEach((span) => {
        span.classList.remove("fade");
      });
    }
  
    navlink.addEventListener("mouseover", () => {
      mouseout = false;
      addclass();
    });
  
    navlink.addEventListener("mouseleave", () => {
      mouseout = true;
      setTimeout(removeClass, 1000);
    });
});

//------------------------------------------------------------
//Page Transitions

const projectContainers = document.querySelectorAll('.project-container');
const pageSliderContainer = document.querySelector('.page-slider-container');
const pageSlider = document.querySelector('.page-slider');

projectContainers.forEach((container) => {
    container.addEventListener('click', (e) => {
        e.preventDefault();
        setTimeout(() => {
            window.location.href = container.getAttribute('href');
        }, 2000);
        pageSliderContainer.classList.add('index');
        pageSlider.classList.add('transition');
    });
});