const pool = require("../db");

// Obtener perfil del cliente por email
exports.obtenerPerfil = async (req, res) => {
  const { email } = req.params;

  try {
    const usuario = await pool.query("SELECT id FROM usuarios WHERE email = $1", [email]);
    if (usuario.rows.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const usuarioId = usuario.rows[0].id;

    const perfil = await pool.query(
      `SELECT * FROM clientes WHERE usuario_id = $1`,
      [usuarioId]
    );

    if (perfil.rows.length === 0) {
      return res.status(404).json({ mensaje: "Perfil no encontrado" });
    }

    res.json(perfil.rows[0]); // Devuelve todos los datos del cliente
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener el perfil del cliente" });
  }
};

// Guardar o actualizar perfil del cliente
exports.guardarPerfil = async (req, res) => {
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

    const existente = await pool.query("SELECT * FROM clientes WHERE usuario_id = $1", [usuarioId]);

    if (existente.rows.length === 0) {
      // Insertar nuevo perfil
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
      // Actualizar perfil existente
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
    console.error(error);
    res.status(500).json({ mensaje: "Error al guardar el perfil del cliente" });
  }
};

exports.obtenerClientePorUsuarioId = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM clientes WHERE usuario_id = $1`,
      [usuarioId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Cliente no encontrado con ese usuarioId" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al buscar cliente por usuarioId:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

