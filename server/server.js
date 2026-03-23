// ==========================================
// SERVER.JS — EjendomsInvest
// Gruppe 30, HA(it) CBS 2026
// ==========================================

const express = require('express');
const sql = require('mssql');
require('dotenv').config();

const app = express();

// Tillad JSON i request body
app.use(express.json());
express.(express.static('public'))

// ==========================================
// DATABASE KONFIGURATION
// ==========================================
const dbConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: true
    }
};

// ==========================================
// API ENDPOINTS
// ==========================================

// GET /api/ejendomme — hent alle ejendomsprofiler
app.get('/api/ejendomme', async function (req, res) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .query('SELECT * FROM Ejendomsprofil ORDER BY oprettet_dato DESC');
        res.json(result.recordset);
    } catch (error) {
        console.error('Databasefejl:', error);
        res.status(500).json({ fejl: 'Kunne ikke hente ejendomme' });
    }
});

// ==========================================
// START SERVER
// ==========================================
app.listen(3000, function () {
    console.log('Server kører på http://localhost:3000');
});
