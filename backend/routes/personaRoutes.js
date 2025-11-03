const express = require("express");
const router = express.Router();
const pool = require("../db");

// Obtener perfil de persona por email
router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        id,
        nombre,
        apellido,
        telefono,
        direccion,
        tipo_documento,
        numero_documento,
        id_municipio,
        usuario AS email,
        fecha_registro
      FROM persona
      WHERE usuario = $1
    `, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error al obtener persona:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});

// Insertar o actualizar persona usando la función SQL
router.post("/", async (req, res) => {
  const {
    email,
    nombre,
    apellido,
    telefono,
    direccion,
    tipo_documento,
    numero_documento,
    id_municipio
  } = req.body;

  console.log("📥 Datos recibidos para guardar:", {
    email,
    nombre,
    apellido,
    telefono,
    direccion,
    tipo_documento,
    numero_documento,
    id_municipio
  });

  try {
    await pool.query(
      `SELECT registrar_o_actualizar_persona($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        email,
        nombre,
        apellido,
        telefono,
        direccion,
        tipo_documento,
        numero_documento,
        id_municipio
      ]
    );

    res.json({ mensaje: "✅ Perfil guardado correctamente (con función SQL)" });
  } catch (error) {
    console.error("❌ Error al guardar persona:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});

// Obtener todas las personas con rol = 'Cliente'
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        nombre,
        apellido,
        telefono,
        direccion,
        tipo_documento,
        numero_documento,
        id_municipio,
        usuario AS email,
        fecha_registro
      FROM persona
      WHERE rol = 'Cliente'
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener personas:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});

module.exports = router;
