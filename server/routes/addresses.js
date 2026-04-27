// routes/addresses.js
// Ansvar: HTTP-laget for adresse-relaterede endpoints.
// Ved IKKE noget om DAWA's URL-struktur — det ligger i servicen.

//  Snakker med browseren. Den modtager browserens kald, tager query'en ud af URL'en, validerer den, og giver den videre til servicen. (dawaService.js)

const express = require('express');
const dawaService = require('../services/dawaService');

const router = express.Router();

router.get('/sog', async (req, res) => {
    const query = req.query.q;

    if (!query || query.length < 2) {
        return res.status(400).json({ fejl: 'Søgeord skal være mindst 2 tegn' });
    }

    try {
        const forslag = await dawaService.sogAdresser(query);
        res.json(forslag);
    } catch (error) {
        console.error('Fejl ved DAWA-opslag:', error);
        res.status(503).json({ fejl: 'Adressetjenesten er midlertidigt utilgængelig' });
    }
});

module.exports = router;