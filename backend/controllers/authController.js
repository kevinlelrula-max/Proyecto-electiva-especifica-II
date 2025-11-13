const pool = require("../db");
const express = require("express");
const router = express.Router();

// =====================
// REGISTRO
// =====================
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
      return res
        .status(400)
        .json({ mensaje: "Ya existe un usuario con ese correo, documento o nombre de usuario." });
    }

    const nuevaPersona = await pool.query(
      `INSERT INTO persona 
        (nombre, apellido, usuario, contrasena, telefono, direccion, tipo_documento, numero_documento, rol, id_municipio) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Cliente', $9) 
       RETURNING *`,
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

// =====================
// LOGIN
// =====================
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

// =====================
// CAMBIAR CONTRASEÑA
// =====================
exports.cambiarPassword = async (req, res) => {
  const { id_usuario, passwordActual, passwordNueva } = req.body;

  if (!id_usuario || !passwordActual || !passwordNueva) {
    return res
      .status(400)
      .json({ mensaje: "Faltan datos: id_usuario, contraseña actual o nueva." });
  }

  try {
    // Llama a la función de PostgreSQL cambiar_contrasena_persona
    const resultado = await pool.query(
      "SELECT cambiar_contrasena_persona($1, $2, $3) AS ok",
      [id_usuario, passwordActual, passwordNueva]
    );

    const ok = resultado.rows[0]?.ok;

    if (!ok) {
      return res
        .status(400)
        .json({ mensaje: "La contraseña actual no es correcta." });
    }

    return res.json({ mensaje: "Contraseña actualizada correctamente." });
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor al cambiar la contraseña." });
  }
};
