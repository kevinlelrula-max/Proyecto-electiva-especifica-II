const pool = require('../db');

exports.obtenerCategorias = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM obtener_categorias_activas()'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener categorías:", error);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
};

exports.obtenerCategoriaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM obtener_categoria_por_id($1)',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error al obtener categoría por ID:", error);
    res.status(500).json({ message: 'Error al obtener categoría' });
  }
};

exports.registrarCategoria = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ message: 'El nombre es obligatorio' });
  }

  try {
    await pool.query('CALL registrar_categoria($1)', [nombre]);
    res.status(201).json({ message: '✅ Categoría registrada o reactivada correctamente' });
  } catch (error) {
    console.error("❌ Error al registrar categoría:", error);
    res.status(500).json({ message: 'Error al registrar categoría' });
  }
};

exports.eliminarCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('UPDATE categoria SET estado = false WHERE id = $1', [id]);
    res.status(200).json({ message: '✅ Categoría eliminada correctamente' });
  } catch (error) {
    console.error("❌ Error al eliminar categoría:", error);
    res.status(500).json({ message: 'Error al eliminar categoría' });
  }
};

exports.actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ message: 'El nombre es obligatorio' });
  }

  try {
    await pool.query(
      'UPDATE categoria SET nombre = $1 WHERE id = $2',
      [nombre, id]
    );
    res.status(200).json({ message: '✅ Categoría actualizada correctamente' });
  } catch (error) {
    console.error("❌ Error al actualizar categoría:", error);
    res.status(500).json({ message: 'Error al actualizar categoría' });
  }
};
