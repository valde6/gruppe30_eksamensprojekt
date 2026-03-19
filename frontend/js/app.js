// ==========================================
// APP.JS — EjendomsInvest
// Gruppe 30, HA(it) CBS 2026
// ==========================================

// ==========================================
// DAWA ADRESSE-SØGNING
// Henter adresseforslag fra DAWA API via fetch
// ==========================================

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const autocompleteList = document.getElementById("autocompleteList");

// Lyt efter tastetryk i søgefeltet
searchInput.addEventListener("input", function () {
    const query = searchInput.value;

    // Hvis søgefeltet er tomt, skjul dropdown
    if (query.length < 2) {
        autocompleteList.style.display = "none";
        autocompleteList.innerHTML = "";
        return;
    }

    // Kald DAWA API med fetch
    const url = "https://api.dataforsyningen.dk/autocomplete?q=" + encodeURIComponent(query) + "&type=adresse&caretpos=" + query.length;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            visForslag(data);
        })
        .catch(function (error) {
            console.error("Fejl ved adressesøgning:", error);
        });
});

// Vis adresseforslag i dropdown
function visForslag(forslag) {
    autocompleteList.innerHTML = "";

    if (forslag.length === 0) {
        autocompleteList.style.display = "none";
        return;
    }

    autocompleteList.style.display = "block";

    forslag.forEach(function (item) {
        const div = document.createElement("div");
        div.classList.add("autocomplete-item");
        div.textContent = item.tekst;

        // Klik på forslag — udfyld søgefeltet og skjul dropdown
        div.addEventListener("click", function () {
            searchInput.value = item.tekst;
            autocompleteList.style.display = "none";
            autocompleteList.innerHTML = "";
        });

        autocompleteList.appendChild(div);
    });
}

// Skjul dropdown hvis man klikker udenfor
document.addEventListener("click", function (event) {
    if (!event.target.closest(".search-box") && !event.target.closest(".autocomplete-list")) {
        autocompleteList.style.display = "none";
    }
});

// Søgeknap — placeholder indtil backend er klar
searchBtn.addEventListener("click", function () {
    const adresse = searchInput.value.trim();

    if (adresse === "") {
        alert("Indtast venligst en adresse.");
        return;
    }

    // TODO: Kald backend API når server er klar
    console.log("Søger efter adresse:", adresse);
    alert("Adresse valgt: " + adresse + "\n\nFunktionalitet kobles på når backend er klar.");
});

// ==========================================
// EJENDOMSPROFIL-KORT
// Håndterer klik på "Se profil" knapperne
// ==========================================

const profileButtons = document.querySelectorAll(".btn-view");

profileButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.closest(".card");
        const adresse = card.querySelector(".card-addr").textContent;

        // TODO: Navigér til ejendom.html med adressens ID
        console.log("Åbner profil for:", adresse);
        alert("Åbner profil for: " + adresse + "\n\nNavigering til ejendomsprofil implementeres snart.");
    });
});