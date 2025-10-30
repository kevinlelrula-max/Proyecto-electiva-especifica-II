const pool = require("../db");
const express = require("express");
const router = express.Router();

exports.registrar = async (req, res) => {
  const {
    nombre,
    apellido,
    telefono,
    direccion,
    tipo_doc,
    numero_documento,
    correo_electronico,
    contrasena,
    id_municipio
  } = req.body;

  const usuario = correo_electronico; 

  try {
    const verificacion = await pool.query(
      "SELECT verificar_persona_existente($1, $2, $3) AS existe",
      [correo_electronico, numero_documento, usuario]
    );

    if (verificacion.rows[0].existe) {
      return res.status(400).json({ mensaje: "Ya existe un usuario con ese correo, documento o nombre de usuario." });
    }

    const nuevaPersona = await pool.query(
      `INSERT INTO persona 
        (nombre, apellido, usuario, contrasena, telefono, direccion, tipo_documento, numero_documento, rol, id_municipio) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Cliente', $9) RETURNING *`,
      [
        nombre,
        apellido,
        usuario,
        contrasena,
        telefono,
        direccion,
        tipo_doc,
        numero_documento,
        id_municipio
      ]
    );

    res.status(201).json({
      mensaje: "Persona registrada correctamente",
      persona: nuevaPersona.rows[0]
    });

  } catch (error) {
    console.error("Error al registrar:", error);
    res.status(500).json({ mensaje: "Error al registrar la persona" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const resultado = await pool.query(
      `SELECT id, usuario AS email, rol 
       FROM persona 
       WHERE usuario = $1 AND contrasena = $2`,
      [email, password]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const persona = resultado.rows[0];

    res.json({
      id: persona.id,
      email: persona.email,
      rol: persona.rol
    });

  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
};
