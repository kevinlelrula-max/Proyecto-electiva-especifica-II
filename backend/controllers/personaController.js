const pool = require("../db");
const express = require("express");
const router = express.Router();

exports.obtenerPerfil = async (req, res) => {
  const { email } = req.params;

  try {
    const resultado = await pool.query(
      "SELECT * FROM persona WHERE usuario = $1",
      [email]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: "Perfil no encontrado" });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

exports.guardarPerfil = async (req, res) => {
  const {
    email,
    nombre,
    apellido,
    telefono,
    direccion,
    tipo_documento, // ✅ CAMBIO AQUÍ
    numero_documento,
    id_departamento,
    id_municipio
  } = req.body;

  // ✅ Mueve el console.log dentro de la función
  console.log("Valores recibidos:", {
    email,
    nombre,
    apellido,
    telefono,
    direccion,
    tipo_documento,
    numero_documento,
    id_departamento,
    id_municipio
  });

  try {
    await pool.query(
      `SELECT registrar_o_actualizar_persona($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        email,
        nombre,
        apellido,
        telefono,
        direccion,
        tipo_documento, // ✅ CAMBIO AQUÍ
        numero_documento,
        id_departamento,
        id_municipio
      ]
    );

    res.json({ mensaje: "Perfil guardado correctamente en persona" });
  } catch (error) {
    console.error("Error al guardar perfil:", error);
    res.status(500).json({ mensaje: "Error al guardar el perfil" });
  }
};

exports.obtenerPersonaPorId = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM persona WHERE id = $1`,
      [usuarioId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener persona por ID:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};
