const modal = document.getElementById("packageModal");

const cards = document.querySelectorAll(".package-card");

const closeBtn = document.querySelector(".close-modal");

cards.forEach(card => {

    card.addEventListener("click", () => {

        const key = card.dataset.package;

        const pkg = packages[key];

        document.getElementById("modalTitle").textContent = pkg.title;

        document.getElementById("modalImage").src = pkg.image;

        document.getElementById("modalImage").alt = pkg.title;

        document.getElementById("modalPrice").textContent =
            "Starts From: " + pkg.price;

        document.getElementById("modalGuests").textContent =
            "Minimum: " + pkg.guests;

        document.getElementById("modalDescription").textContent =
            pkg.description;

        const list = document.getElementById("modalFeatures");

        list.innerHTML = "";

        pkg.features.forEach(feature => {

            const li = document.createElement("li");

            li.textContent = feature;

            list.appendChild(li);

        });

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});

function closeModal(){

    modal.classList.remove("show");

    document.body.style.overflow = "";

}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", e=>{

    if(e.target===modal){

        closeModal();

    }

});

document.addEventListener("keydown",e=>{

    if(e.key==="Escape"){

        closeModal();

    }

});