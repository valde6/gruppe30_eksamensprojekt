// services/dawaService.js
// Ansvar: Kommunikere med DAWA's autocomplete-API.
// Ved IKKE noget om Express, HTTP-status eller browseren.

// Da BBR har brug for login skal den ikke kaldes i direkte i frontend(så kan brugeren se vores login) den skal derfor lægges i backend og kaldes derfra.
// For at holde det ens for alle api kald gøres dette også med DAWA kaldet.

const DAWA_BASE_URL = 'https://api.dataforsyningen.dk/autocomplete';

async function sogAdresser(query) {
    const url = DAWA_BASE_URL + '?q=' + encodeURIComponent(query) + '&type=adresse&caretpos=' + query.length;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('DAWA svarede med status ' + response.status);
    }

    return await response.json();
}

module.exports = { sogAdresser };