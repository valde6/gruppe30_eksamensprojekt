const express = require('express');

const app = express();

app.get('/api/ejendomme', function (req, res) {
    res.json({ besked: "Det virker!" });
});

app.listen(3000);