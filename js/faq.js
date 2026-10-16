/*=====================================
        FAQ ACCORDION
        One answer open at a time. Each answer
        opens to the height of its own text.
======================================*/

const faqItems = document.querySelectorAll(".faq-item");

function setFaq(item, open) {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    item.classList.toggle("active", open);

    question.setAttribute("aria-expanded", String(open));

    answer.style.maxHeight = open ? answer.scrollHeight + "px" : "";

}

faqItems.forEach(item => {

    item.querySelector(".faq-question").addEventListener("click", () => {

        const opening = !item.classList.contains("active");

        faqItems.forEach(faq => {
            if (faq !== item) setFaq(faq, false);
        });

        setFaq(item, opening);

    });

});

/* keep an open answer the right height if the screen size changes */
window.addEventListener("resize", () => {

    const open = document.querySelector(".faq-item.active");

    if (open) setFaq(open, true);

}, { passive: true });
