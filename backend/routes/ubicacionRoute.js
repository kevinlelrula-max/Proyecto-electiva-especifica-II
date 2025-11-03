// src/routes/ubicacionRoute.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Obtener todos los departamentos
router.get("/departamentos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM obtener_departamentos()");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener departamentos:", error);
    res.status(500).json({ mensaje: "Error al obtener departamentos" });
  }
});

// Obtener municipios por id_departamento
router.get("/municipios/:id_departamento", async (req, res) => {
  const id_departamento = parseInt(req.params.id_departamento, 10);

  if (isNaN(id_departamento)) {
    return res.status(400).json({ mensaje: "ID de departamento inválido" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM obtener_municipios_por_departamento($1)",
      [id_departamento]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener municipios:", error);
    res.status(500).json({ mensaje: "Error al obtener municipios" });
  }
});


// Obtener el departamento a partir de un municipio
router.get("/municipio/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT id_departamento FROM municipios WHERE id = $1",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ mensaje: "Municipio no encontrado" });
    }
    res.json(result.rows[0]); // Retorna { id_departamento: ... }
  } catch (error) {
    console.error("Error al obtener departamento por municipio:", error);
    res.status(500).json({ mensaje: "Error al obtener departamento" });
  }
});

module.exports = router;
