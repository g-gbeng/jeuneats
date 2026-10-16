/*=====================================
        STICKY HEADER
        One passive listener, at most once per frame.
======================================*/

const header = document.querySelector("header");

let headerScrolled = null;
let scrollTicking = false;

function updateHeader() {

    scrollTicking = false;

    const isScrolled = window.scrollY > 80;

    if (isScrolled !== headerScrolled) {
        header.classList.toggle("scrolled", isScrolled);
        headerScrolled = isScrolled;
    }

}

window.addEventListener("scroll", () => {

    if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(updateHeader);
    }

}, { passive: true });

updateHeader();


/*=====================================
        MOBILE MENU
======================================*/

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-links");

const navLinks = document.querySelectorAll(".nav-links a");

function setMenu(open) {

    navMenu.classList.toggle("show", open);

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");

}

menuToggle.addEventListener("click", () => {

    setMenu(!navMenu.classList.contains("show"));

});

navLinks.forEach(link => {

    link.addEventListener("click", () => setMenu(false));

});

/* close when tapping outside the header, or pressing Esc */
document.addEventListener("click", e => {

    if (navMenu.classList.contains("show") && !header.contains(e.target)) {
        setMenu(false);
    }

});

document.addEventListener("keydown", e => {

    if (e.key === "Escape" && navMenu.classList.contains("show")) {
        setMenu(false);
        menuToggle.focus();
    }

});


/*=====================================
        ACTIVE NAVIGATION
        Watches which section is just below the
        header instead of measuring every section
        on every scroll.
======================================*/

const sections = document.querySelectorAll("section[id]");

const linkFor = new Map(
    Array.from(navLinks, link => [link.getAttribute("href"), link])
);

const sectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        navLinks.forEach(link => link.classList.remove("active"));

        linkFor.get("#" + entry.target.id)?.classList.add("active");

    });

}, {
    rootMargin: "-140px 0px -55% 0px"
});

sections.forEach(section => sectionObserver.observe(section));


/*=====================================
        SCROLL REVEAL
        Package cards appear one after another.
        Once an element has appeared, the reveal
        styles are removed so its own hover
        effects work normally.
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

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion) {

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    document.querySelectorAll(".package-card").forEach((card, i) => {
        card.style.transitionDelay = (0.05 + i * 0.07).toFixed(2) + "s";
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const el = entry.target;

            el.classList.add("revealed");

            observer.unobserve(el);

            el.addEventListener("transitionend", function done(e) {

                if (e.target !== el || e.propertyName !== "opacity") return;

                el.classList.remove("reveal", "revealed");
                el.style.transitionDelay = "";

                el.removeEventListener("transitionend", done);

            });

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => revealObserver.observe(element));

}
