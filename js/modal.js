/*=====================================
        PACKAGE MODAL
======================================*/

const modal = document.getElementById("packageModal");

const cards = document.querySelectorAll(".package-card");

const closeBtn = document.querySelector(".close-modal");

const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalPrice = document.getElementById("modalPrice");
const modalGuests = document.getElementById("modalGuests");
const modalDescription = document.getElementById("modalDescription");
const modalFeatures = document.getElementById("modalFeatures");

let lastFocused = null;

function openModal(key) {

    const pkg = packages[key];

    if (!pkg) return;

    lastFocused = document.activeElement;

    modalTitle.textContent = pkg.title;

    modalImage.src = pkg.image;
    modalImage.alt = pkg.title;

    modalPrice.textContent = "Starts From: " + pkg.price;
    modalGuests.textContent = "Minimum: " + pkg.guests;
    modalDescription.textContent = pkg.description;

    modalFeatures.replaceChildren(
        ...pkg.features.map(feature => {
            const li = document.createElement("li");
            li.textContent = feature;
            return li;
        })
    );

    modal.querySelector(".modal-content").scrollTop = 0;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

    closeBtn.focus();

}

function closeModal() {

    if (!modal.classList.contains("show")) return;

    modal.classList.remove("show");

    document.body.style.overflow = "";

    if (lastFocused) lastFocused.focus();

}

/* the whole card opens the modal; its "View Details" button
   gives keyboard users something to Tab to */
cards.forEach(card => {

    card.addEventListener("click", () => openModal(card.dataset.package));

});

closeBtn.addEventListener("click", closeModal);

/* click on the dark backdrop closes it */
modal.addEventListener("click", e => {

    if (e.target === modal) closeModal();

});

/* Esc closes; Tab stays inside the modal while it's open */
document.addEventListener("keydown", e => {

    if (!modal.classList.contains("show")) return;

    if (e.key === "Escape") {
        closeModal();
        return;
    }

    if (e.key === "Tab") {

        const focusable = modal.querySelectorAll("button, a[href]");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }

    }

});
