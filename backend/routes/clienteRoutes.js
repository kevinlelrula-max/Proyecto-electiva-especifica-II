const express = require("express");
const router = express.Router();
const pool = require("../db");

// Obtener datos del cliente usando el email del usuario
router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
        clientes.id, 
        clientes.nombre, 
        clientes.apellido, 
        clientes.telefono, 
        clientes.direccion, 
        clientes.tipo_documento_id,
        clientes.numero_documento,
        clientes.id_municipio,
        clientes.id_departamento,
        usuarios.email
       FROM clientes
       INNER JOIN usuarios ON clientes.usuario_id = usuarios.id
       WHERE usuarios.email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});

// Guardar o actualizar datos del cliente
router.post("/", async (req, res) => {
  const {
    email,
    nombre,
    apellido,
    telefono,
    direccion,
    tipo_documento_id,
    numero_documento,
    id_municipio,
    id_departamento
  } = req.body;

  try {
    const usuario = await pool.query("SELECT id FROM usuarios WHERE email = $1", [email]);
    if (usuario.rows.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const usuarioId = usuario.rows[0].id;

    const clienteExistente = await pool.query("SELECT * FROM clientes WHERE usuario_id = $1", [usuarioId]);

    if (clienteExistente.rows.length === 0) {
      // Insertar nuevo cliente
      await pool.query(
        `INSERT INTO clientes 
        (usuario_id, nombre, apellido, telefono, direccion, tipo_documento_id, numero_documento, id_municipio, id_departamento) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          usuarioId,
          nombre,
          apellido,
          telefono,
          direccion,
          tipo_documento_id,
          numero_documento,
          id_municipio,
          id_departamento
        ]
      );
    } else {
      // Actualizar cliente existente
      await pool.query(
        `UPDATE clientes SET 
          nombre = $1, 
          apellido = $2, 
          telefono = $3, 
          direccion = $4, 
          tipo_documento_id = $5,
          numero_documento = $6,
          id_municipio = $7,
          id_departamento = $8
        WHERE usuario_id = $9`,
        [
          nombre,
          apellido,
          telefono,
          direccion,
          tipo_documento_id,
          numero_documento,
          id_municipio,
          id_departamento,
          usuarioId
        ]
      );
    }

    res.json({ mensaje: "Perfil guardado correctamente" });
  } catch (error) {
    console.error("Error al guardar cliente:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});

// Obtener todos los clientes
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        clientes.id,
        usuarios.email,
        clientes.nombre,
        clientes.apellido,
        clientes.telefono,
        clientes.direccion,
        clientes.tipo_documento_id,
        clientes.numero_documento,
        clientes.id_municipio,
        clientes.id_departamento,
        clientes.fecha_registro
      FROM clientes
      INNER JOIN usuarios ON clientes.usuario_id = usuarios.id
      ORDER BY clientes.fecha_registro DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener todos los clientes:", error);
    res.status(500).json({ mensaje: "Error al obtener los clientes" });
  }
});

const { obtenerClientePorUsuarioId } = require("../controllers/clienteController");

router.get("/usuario/:usuarioId", obtenerClientePorUsuarioId);

module.exports = router;
