const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});

/*=====================================
        PAGE FADE-IN
======================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-links");

const navLinks = document.querySelectorAll(".nav-links a");



document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

    });

});

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");

});

/*=====================================
        ACTIVE NAVIGATION
======================================*/

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;

        if (

            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight

        ){

            current = section.id;

        }

    });

    navLinks.forEach(link=>{

        link.classList.toggle(

            "active",

            link.getAttribute("href") === "#" + current

        );

    });

});


/*=====================================
        SCROLL REVEAL
======================================*/

const revealElements = document.querySelectorAll(`
    .section-title,
    .about-grid,
    .package-card,
    .faq-item,
    .contact-card,
    .contact-cta,
    .footer-content
`);

revealElements.forEach(element => {

    element.classList.add("reveal");

});

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("revealed");

            observer.unobserve(entry.target);

        }

    });

},{
    threshold:0.15
});

revealElements.forEach(element=>{

    observer.observe(element);

});

