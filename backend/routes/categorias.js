// routes/categorias.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categoria'); // ✅ sin filtro estado
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ mensaje: 'Error al obtener categorías' });
  }
});

module.exports = router;
