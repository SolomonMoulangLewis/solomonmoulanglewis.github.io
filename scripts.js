document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);

    const inverseTextElements = document.querySelectorAll('.inverse-text');

    inverseTextElements.forEach(element => {
        const parentBackgroundColor = window.getComputedStyle(element.parentElement).backgroundColor;
        const rgbValues = parentBackgroundColor.match(/\d+/g);

        if (rgbValues) {
            const invertedColor = rgbValues.map(value => 255 - value).join(',');
            element.style.color = `rgb(${invertedColor})`;
        }
    });

    const linesContainer = document.querySelector('.lines-container');
    const numberOfLines = 18;
    const containerHeight = linesContainer.clientHeight;

    // Create 10 rows with lines
    for (let i = 0; i < numberOfLines; i++) {
        const line = document.createElement('div');
        line.classList.add('line');

        // TODO: recalculate line height on window resize
        line.style.height = `${containerHeight / numberOfLines}px`;

        // Set the line's y position to be evenly spaced
        const yPos = (i / numberOfLines) * 100;
        line.style.top = `${yPos}%`;

        // Alternate starting position: left or right
        if (i % 2 === 0) {
            line.style.left = '0';
            line.style.transformOrigin = 'left center';
        } else {
            line.style.right = '0';
            line.style.transformOrigin = 'right center';
        }

        linesContainer.appendChild(line);

        // Create a scroll trigger for each line with random start points
        const randomStart = Math.random() * 0.8; // random start between 0 and 0.8
        gsap.to(line, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.page2',
                start: `top top+=${randomStart * 100}%`,
                end: 'top top',
                scrub: true,
            }
        });
    }

    const lines = document.querySelectorAll ('.lines-container div');
    window.addEventListener('resize', () => {
        lines.forEach(line => {
            line.style.height = `${linesContainer.clientHeight / numberOfLines}px`;
        });
    });

    //===============================================================
    // PAGE 2 - scroll words from l/r to center
    //===============================================================
    const textElements = document.querySelectorAll('.text');

    textElements.forEach((element, index) => {
        const direction = (index % 2 === 0) ? 'left' : 'right';
        const distance = (direction === 'left') ? '-20vw' : '20vw';

        gsap.fromTo(element, 
            { x: distance }, 
            { 
                x: '0',
                scrollTrigger: {
                    trigger: '.page2',
                    start: 'top center',
                    end: 'bottom bottom',
                    scrub: true
                }
            }
        );
    });
    //===============================================================
    // on PAGE 3 enter: fade out portfolio title text
    //===============================================================
    textElements.forEach((element) => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: '.page2-5',
                start: 'top bottom',
                end: 'top top',
                /* x: distance */
                onEnter: () => gsap.to(element, {opacity: 0, duration: 0.3, ease: 'power2.easeOut'}),
                onLeaveBack: () => gsap.to(element, {opacity: 1, duration: 0.3, ease: 'power2.easeOut'}),
            }
        });
    });

    //===============================================================
    // PROJECT FUNCTIONS !!
    //===============================================================
    // fade page overlay function
    //===============================================================
    function fadeOverLay (overlayName, pageName) {
        ScrollTrigger.create({
            trigger: pageName,
            start: 'top bottom',
            end: 'bottom bottom',
            onEnter: () => {
                gsap.to(overlayName, {opacity: 1, duration: 0.3});
            },
            onLeave: () => gsap.to(overlayName, {opacity: 0, duration: 0.3}),
            onEnterBack: () => gsap.to(overlayName, {opacity: 1, duration: 0.3}),
            onLeaveBack: () => gsap.to(overlayName, {opacity: 0, duration: 0.3}),
        });
    }
    //===============================================================
    // Project Title fade in & out function
    //===============================================================
    function titleAnimation (element, pageName) {
        /* ScrollTrigger.create({
            trigger: pageName,
            start: 'top bottom',
            end: 'top top',
            onEnter: () => {
                gsap.fromTo(element, {top: '-40vh', opacity: 0}, 
                                     {top: '4vh', opacity: 1, duration: 0.5, ease: 'power2.ease'});
            },
            onEnterBack: () => {
                gsap.fromTo(element, {top: '-40vh', opacity: 0}, 
                                                    { top: '4vh', opacity: 1, duration: 0.5, ease: 'power2.ease'});
            },
            onLeaveBack: () => {
                gsap.to(element, {top: '-40vh', opactiy: 0, duration: 0.5, ease: 'power3.easeInOut'});
            },
            onLeave: () => {
                gsap.to(element, {top: '-40vh', opactiy: 0, duration: 0.5, ease: 'power3.easeInOut'});
            },
        }); */
        ScrollTrigger.create({
            trigger: pageName,
            start: 'top bottom',
            end: 'bottom bottom',
            onEnter: () => {
                gsap.fromTo(element, {x: "100%", opacity: 0}, 
                                     {x: '0%', opacity: 1, duration: 0.5, ease: 'power2.ease'});
            },
            onEnterBack: () => {
                gsap.fromTo(element, {x: '-100%', opacity: 0}, 
                                     {x: '0%', opacity: 1, duration: 0.5, ease: 'power2.ease'});
            },
            onLeave: () => {
                gsap.to(element, {x: '-100%', opacity: 0, duration: 0.5, ease: 'power3.easeInOut'});
            },
            onLeaveBack: () => {
                gsap.to(element, {x: '100%', opacity: 0, duration: 0.5, ease: 'power3.easeInOut'});
            },
        });        

    }
    //===============================================================
    // position body text function
    //===============================================================
    function positionBodyText (titleElement, bodyElement) {
        const windowHeight = window.innerHeight;
        const gap = windowHeight * 0.1;
        bodyElement.style.top = (titleElement.clientTop + titleElement.clientHeight) + gap + 'px';
    }
    //===============================================================
    // type write functions
    //===============================================================
    function typeWrite (text, bodySpans, bodySpansClass, page, callback) {
        let index = 0; 
        let letter = '';

        function type() {
            letter = text.slice(0, ++index);
            bodySpans.textContent = letter;
            if (index != text.length) {
                setTimeout(type, 15);
            }
            else
            {
                if (callback) callback();
            }
        }
        function addCursor() {
            bodySpans.classList.add('blinking-cursor');
        }
        function removeCursor() {
            bodySpans.classList.remove('blinking-cursor');
        }

        ScrollTrigger.create({
            trigger: page,
            start: 'top bottom',
            end: 'bottom bottom',
            onEnter: () => {
                letter = '';
                index = 0;
                setTimeout(type, 300);
                setTimeout(addCursor, 300);
                gsap.to(bodySpansClass, {opacity: 1, duration: 0.3});
            },
            onEnterBack: () => {
                setTimeout(gsap.fromTo(bodySpansClass, {opacity: 0}, {opacity: 1, duration: 0.5}), 800);
                setTimeout(addCursor, 300);
            },
            onLeave: () => {
                gsap.to(bodySpansClass, {opacity: 0});
                removeCursor();
            },
            onLeaveBack: () => {
                gsap.to(bodySpansClass, {opacity: 0});
                removeCursor();
            }
        });
    }
    //===============================================================
    // Img container function
    //===============================================================
    function scrollImageContainer(imgContainerName, imageNames, pageName) {
        const imgContainer = document.querySelector(imgContainerName);
        const images = document.querySelectorAll(imageNames);
    
        const gap = 100;
        let totalWidth = 0;
    
        images.forEach((img, index) => {
            totalWidth += img.offsetWidth;
            if (index < images.length - 1) {
                totalWidth += gap;
            }
        });
    
        const containerWidth = imgContainer.clientWidth;
    
        gsap.fromTo(images, { x: `${containerWidth}px` }, {
            x: `${imgContainer.clientLeft - totalWidth - gap}px`,
            scrollTrigger: {
                trigger: pageName,
                start: 'top bottom',
                end: 'bottom bottom',
                onLeave: () => {
                    gsap.to(imgContainer, {opacity: 0, duration: 0.3});
                },
                onLeaveBack: () => {
                    gsap.to(imgContainer, {opacity: 0, duration: 0.3});
                },
                onEnter: () => {
                    gsap.to(imgContainer, {opacity: 1, duration: 0.3});
                },
                onEnterBack: () => {
                    gsap.to(imgContainer, {opacity: 1, duration: 0.3});
                },
                scrub: true,
                invalidateOnRefresh: true, // Ensures the animation is recalculated on resize
            }
        });
    }

    //===============================================================
    // PROJECT FUNCTION STRUCTURE
    //===============================================================
    fadeOverLay ('.page3-overlay', '.page3');
    fadeOverLay ('.page4-overlay', '.page4');
    fadeOverLay ('.page5-overlay', '.page5');
    fadeOverLay ('.page6-overlay', '.page6');
    fadeOverLay ('.page7-overlay', '.page7');
    fadeOverLay ('.page8-overlay', '.page8');

    titleAnimation ('#text-quilio', '.page3');
    titleAnimation ('#text-blue-sparrow', '.page4');
    titleAnimation ('#text-yellow', '.page5');
    titleAnimation ('#text-dan', '.page6');
    titleAnimation ('#text-weather', '.page7');

    const quilioTitle = document.querySelector('#text-quilio');
    const quilioBody = document.querySelector('#about-quilio');
    positionBodyText (quilioTitle, quilioBody);
    const blueSparrowTitle = document.querySelector('#text-blue-sparrow');
    const blueSparrowBody = document.querySelector('#about-blue-sparrow');
    positionBodyText (blueSparrowTitle, blueSparrowBody);
    const yellowTitle = document.querySelector('#text-yellow');
    const yellowBody = document.querySelector('#about-yellow');
    positionBodyText (yellowTitle, yellowBody);
    const danTitle = document.querySelector('#text-dan');
    const danBody = document.querySelector('#about-dan');
    positionBodyText (danTitle, danBody);
    const weatherTitle = document.querySelector('#text-weather');
    const weatherBody = document.querySelector('#about-weather');
    positionBodyText (weatherTitle, weatherBody);

    window.addEventListener('resize', () => {
        positionBodyText (quilioTitle, quilioBody);
        positionBodyText (blueSparrowTitle, blueSparrowBody);
        positionBodyText (yellowTitle, yellowBody);
        positionBodyText (danTitle, danBody);
        positionBodyText (weatherTitle, weatherBody);
    })

    const aboutMeText = "I AM A SOFTWARE ENGINEER, AUDIO PROGRAMMER, AND WEB DEVELOPER WITH A PASSION FOR ELECTRONIC MUSIC.";
    const aboutMeElement = document.querySelector ('.txt-type-about-me');
    typeWrite(aboutMeText, aboutMeElement, '.txt-type-about-me', '.page2-5', () => {
        unlockScrolling();
    });

    /* PAGE 3 */
    const quilioAboutText = "I INTEGRATED THIS WEBSITE FROM A DESIGN, INCORPORATING ANIMATIONS TO ENHANCE THE USER EXPERIENCE.";
    const quilioAboutSpan = document.querySelector ('.txt-type-quilio');
    typeWrite (quilioAboutText, quilioAboutSpan, '.txt-type-quilio', '.page3', () => {
        const quilioLink = document.querySelector('#quilio-link');
        quilioLink.style.top = quilioAboutSpan.getBoundingClientRect().top + quilioAboutSpan.getBoundingClientRect().height + 20 + 'px';
    });
    window.addEventListener('resize', () => {
        const quilioLink = document.querySelector('#quilio-link');
        quilioLink.style.top = quilioAboutSpan.getBoundingClientRect().top + quilioAboutSpan.getBoundingClientRect().height + 20 + 'px';
    });
    const quilioLink = document.querySelector('#quilio-link');
    ScrollTrigger.create({
        trigger: '.page3',
        start: 'top bottom',
        end: 'top top',
        onLeave: () => {
            gsap.to('#quilio-link', {opacity: 0});
            quilioLink.classList.remove('fixed');
            quilioLink.classList.add('hidden');
            quilioLink.classList.add('pointer-events-none');
        },
        onLeaveBack: () => {
            gsap.to('#quilio-link', {opacity: 0});
            quilioLink.classList.remove('fixed');
            quilioLink.classList.add('hidden');
            quilioLink.classList.add('pointer-events-none');
        },
        onEnterBack: () => {
            quilioLink.classList.remove('hidden');
            quilioLink.classList.add('fixed');
            gsap.to('#quilio-link', {opacity: 1, duration: 0.3});
            quilioLink.classList.remove('pointer-events-none');
            quilioLink.classList.add('pointer-events-all');
        },
        onEnter: () => {
            quilioLink.classList.remove('hidden');
            quilioLink.classList.add('fixed');
            gsap.to('#quilio-link', {opacity: 1, duration: 0.3});
            quilioLink.classList.remove('pointer-events-none');
            quilioLink.classList.add('pointer-events-all');
        }
    });

    /* PAGE 4 */
    const blueSparrowAbout = "I WORKED ON INTEGRATION AND DESIGN WITH BLUE SPARROW APPS ON THIS WEB3 CRYPTO PROJECT.";
    const blueSparrowSpan = document.querySelector ('.txt-type-blue-sparrow');
    typeWrite (blueSparrowAbout, blueSparrowSpan, '.txt-type-blue-sparrow', '.page4');
    /* PAGE 5 */
    const yellowAbout = "I CREATE INTUITIVE, INTERACTIVE EXPERIENCES.";
    const yellowSpan = document.querySelector ('.txt-type-yellow');
    typeWrite (yellowAbout, yellowSpan, '.txt-type-yellow', '.page5');
    /* PAGE 6 */
    const danAbout = "CREATIVE THINKING, ANIMATION DESIGN, AND INTERACTION.";
    const danSpan = document.querySelector ('.txt-type-dan');
    typeWrite (danAbout, danSpan, '.txt-type-dan', '.page6');
    /* PAGE 7 */
    const weatherAbout = "IMMERSIVE EXPERIENCE DESIGN, UTILISING OPENWEATHERMAP API.";
    const weatherSpan = document.querySelector ('.txt-type-weather');
    typeWrite (weatherAbout, weatherSpan, '.txt-type-weather', '.page7');

    scrollImageContainer ('#quilio-img-container', '.quilio-img', '.page3');
    scrollImageContainer ('#blue-sparrow-img-container', '.blue-sparrow-img', '.page4');

    window.addEventListener('resize', () => {
        ScrollTrigger.refresh(); // Refresh GSAP ScrollTrigger
    });

    //===============================================================
    // SCROLLBAR
    //===============================================================
    /* function scrollBar() {
        const totalHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
        ) - window.innerHeight;
    
        gsap.to("#top", {
            width: "100vw",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: `+=${totalHeight / 4}px`,
                scrub: true,
                onEnter: () => {
                    console.log('top');
                }
            }
        });
    
        // Animate the right border
        gsap.to("#right", {
            height: "100vh",
            scrollTrigger: {
                trigger: document.body,
                start: `+=${totalHeight / 4}px`,
                end: `+=${totalHeight / 4}px`,
                scrub: true
            }
        });
    
        // Animate the bottom border
        gsap.to("#bottom", {
            width: "100vw",
            scrollTrigger: {
                trigger: document.body,
                start: `+=${totalHeight / 2}`,
                end: `+=${totalHeight / 4}px`,
                scrub: true
            }
        });
    
        // Animate the left border
        gsap.to("#left", {
            height: "100vh",
            scrollTrigger: {
                trigger: document.body,
                start: `+=${(totalHeight / 4) * 3}px`,
                end: `+=${totalHeight / 4}px`,
                scrub: true
            }
        });
    }
    scrollBar(); */

    //===============================================================
    // scroll lock test
    //===============================================================
    let hasPassed = false;

    function lockScrolling() {
        document.body.style.overflowY = 'hidden';
        isLocked = true;
    }

    function unlockScrolling() {
        document.body.style.overflowY = 'auto';
        isLocked = false;
    }

    ScrollTrigger.create({
        trigger: ".page2-5",
        onEnter: () => {
            if (!hasPassed)
            {
                lockScrolling();
                hasPassed = true;
            }
        },
        onLeaveBack: () => {
            unlockScrolling();
        }
    });

    //===============================================================
    // iframe loading
    //===============================================================
    // Function to load the iframe
    /* function loadIframe(iframeContainer) {
        if (!iframeContainer.querySelector('iframe')) {
            const iframe = document.createElement('iframe');
            iframe.src = './websites/yellow/index.html';
            iframe.classList.add('w-full', 'h-full');
            iframeContainer.appendChild(iframe);
        }
    }
    // Function to remove the iframe
    function removeIframe(iframeContainer) {
        const iframe = iframeContainer.querySelector('iframe');
        if (iframe) {
            iframeContainer.removeChild(iframe);
        }
    }

    const page5IframeContainer = document.querySelector('#yellow-iframe-container');

    ScrollTrigger.create({
        trigger: '.page5',
        start: 'top bottom',
        end: 'top top',
        onEnter: () => {
            setTimeout(() => {
                loadIframe(page5IframeContainer);
            }, 500);
        },
        onLeaveBack: () => {
            // Check if the scroll has gone up past the page
            if (window.scrollY < document.querySelector('.page5').offsetTop) {
                removeIframe(page5IframeContainer);
            }
        }
    }); */

    function loadIframe(iframeContainer, websiteUrl) {
        if (!iframeContainer.querySelector('iframe')) {
            const iframe = document.createElement('iframe');
            iframe.src = websiteUrl;
            iframe.classList.add('w-full', 'h-full');
            iframeContainer.appendChild(iframe);
        }
    }

    function removeIframe(iframeContainer) {
        const iframe = iframeContainer.querySelector('iframe');
        if (iframe) {
            iframeContainer.removeChild(iframe);
        }
    }

    function applyIframeAnimation(iframe, iframeName, websiteUrl, pageName) {
        ScrollTrigger.create({
            trigger: pageName,
            start: 'top bottom',
            end: 'bottom top', // Ensure the iframe is removed promptly when leaving the viewport
            onEnter: () => {
                loadIframe(iframe, websiteUrl);
                gsap.to(iframeName, {opacity: 1, duration: 0.3});
            },
            onEnterBack: () => {
                loadIframe(iframe, websiteUrl);
                gsap.to(iframeName, {opacity: 1, duration: 0.3});
            },
            onLeaveBack: () => {
                gsap.to(iframeName, {opacity: 0, duration: 0.3});
                setTimeout(() => {
                    removeIframe(iframe);
                }, 300); // Delay to ensure animation completes before removal
            },
            onLeave: () => {
                gsap.to(iframeName, {opacity: 0, duration: 0.3});
                setTimeout(() => {
                    removeIframe(iframe);
                }, 300); // Delay to ensure animation completes before removal
            }
        });
    }

    const page5IframeContainer = document.querySelector('#yellow-iframe-container');
    applyIframeAnimation(page5IframeContainer, '#yellow-iframe-container', './websites/yellow/index.html', '.page5');

    const page6IframeContainer = document.querySelector('#dan-iframe-container');
    applyIframeAnimation(page6IframeContainer, '#dan-iframe-container', './websites/nice-design/index.html', '.page6');

    const page7IframeContainer = document.querySelector('#weather-iframe-container');
    applyIframeAnimation(page7IframeContainer, '#weather-iframe-container', './websites/elements-in-harmony/index.html', '.page7');

    //===============================================================
    // dots
    //===============================================================
    const pages = document.querySelectorAll('.page');
    const dots = document.querySelectorAll('.dot');

    gsap.to('.page-dots', {opacity: 1});

    ScrollTrigger.create({
        trigger: '.page3',
        onEnter: () => {
            gsap.to('.page-dots', {opacity: 1, duration: 0.3});
        },
        onLeaveBack: () => {
            gsap.to('.page-dots', {opacity: 0, duration: 0.3});
        }
    });

    function updateDotClasses(page, index) {
        let colorClass;
    
        if (page.classList.contains('page3') || page.classList.contains('page5') || page.classList.contains('page6')) {
            colorClass = 'bg-white';
        } else if (page.classList.contains('page4') || page.classList.contains('page7')) {
            colorClass = 'bg-black';
        }
    
        dots.forEach(dot => {
            dot.classList.remove('active', 'bg-white', 'bg-black');
            if (colorClass) {
                dot.classList.add(colorClass);
            }
        });
    
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
    
    pages.forEach((page, index) => {
        ScrollTrigger.create({
            trigger: page,
            start: 'top bottom',
            end: 'bottom bottom',
            onEnter: () => updateDotClasses(page, index),
            onEnterBack: () => updateDotClasses(page, index),
            onLeave: () => updateDotClasses(page, index),
            onLeaveBack: () => updateDotClasses(page, index),
        });
    });

    /* ScrollTrigger.create({
        trigger: '.page4',
        start: 'center center',
        end: 'top top',
    })

    gsap.to('#yellow-iframe-container', {
        opacity: 0,
        scrollTrigger: {
            trigger: '.page4',
            start: 'center center',
            end: 'top top',
            scrub: true
        }
    }) */

    //===============================================================
    // fade back in portfolio text on page8
    //===============================================================
    /* textElements.forEach((element) => {
        gsap.to(element, 
            { 
                x: '0',
                scrollTrigger: {
                    trigger: '.page8',
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: true
                }
            }
        );
    }); */
    //===============================================================
    // on PAGE 3 enter: fade out portfolio title text
    //===============================================================
    textElements.forEach((element) => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: '.page8',
                start: 'top bottom',
                end: 'bottom bottom',
                /* x: distance */
                onEnter: () => gsap.to(element, {opacity: 1, duration: 0.3, ease: 'power2.easeOut'}),
                onLeaveBack: () => gsap.to(element, {opacity: 0, duration: 0.3, ease: 'power2.easeOut'}),
            }
        });
    });

    /* const linesContainer2 = document.querySelector('.lines-container2');

    for (let i = 0; i < numberOfLines; i++) {
        const line = document.createElement('div');
        line.classList.add('line2');
    
        // Recalculate line height on window resize
        line.style.height = `${containerHeight / numberOfLines}px`;
    
        // Set the line's y position to be evenly spaced
        const yPos = (i / numberOfLines) * 100;
        line.style.top = `${yPos}%`;
    
        // Alternate starting position: left or right
        if (i % 2 === 0) {
            line.style.left = '0';
            line.style.transformOrigin = 'left center';
        } else {
            line.style.right = '0';
            line.style.transformOrigin = 'right center';
        }
    
        linesContainer2.appendChild(line);
    
        // Create a scroll trigger for each line with random start points
        const randomStart = Math.random() * 0.8; // random start between 0 and 0.8
        gsap.from(line, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.page8',
                start: `top top+=${randomStart * 100}%`,
                end: 'top top',
                scrub: true,
            }
        });
    }

    const linesInContainer2 = document.querySelectorAll('.line2');

    console.log(linesInContainer2);

    linesInContainer2.forEach(line => {
        ScrollTrigger.create({
            trigger: '.page8',
            onEnter: () => {
                gsap.to(line, {opacity: 1});
            },
            onLeaveBack: () => {
                gsap.to(line, {opacity: 0});
            }
        })
    }); */

    ScrollTrigger.create({
        trigger: '.page2-5',
        onEnter: () => {
            setTimeout(() => {
                gsap.to('#get-me', {opacity: 1, duration: 1.5, ease: 'power3.easeIn'});
            }, 1500);
        }
    });

    const weatherIframeMask = document.querySelector('#weather-iframe-mask');
    const weatherIframeContainer = document.querySelector('#weather-iframe-container');

    const adjustMask = () => {
        const height = weatherIframeContainer.clientHeight;
        const y = weatherIframeContainer.getBoundingClientRect().y;

        const startY = height * 0.2;

        weatherIframeMask.style.top = startY + y + 'px';
        weatherIframeMask.style.height = height - startY;
    };

    // Initial adjustment
    adjustMask();

    // Adjust on window resize
    window.addEventListener('resize', adjustMask);
});
