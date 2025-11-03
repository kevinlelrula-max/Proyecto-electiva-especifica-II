const express = require('express');
const router = express.Router();
const pool = require('../db'); // tu conexión a PostgreSQL

// Obtener todos los métodos de pago
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('select * from obtener_metodopago()');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener métodos de pago:', error);
    res.status(500).json({ error: 'Error al obtener los métodos de pago' });
  }
});


// Agregar un nuevo método de pago
router.post('/', async (req, res) => {
  const { nombre } = req.body;
  try {
    await pool.query('call agregar_metodo_pago($1)', [nombre]);
    res.status(201).json({ mensaje: 'Método de pago registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar método de pago:', error);
    res.status(500).json({ error: 'Error al registrar método de pago' });
  }
});

// Editar un método de pago
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await pool.query('call actualizar_metodo_pago($1, $2)', [id, nombre]);
    res.json({ mensaje: 'Método de pago actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar método de pago:', error);
    res.status(500).json({ error: 'Error al actualizar método de pago' });
  }
});

// Eliminar un método de pago
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('call eliminar_metodo_pago($1)', [id]);
    res.json({ mensaje: 'Método de pago eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar método de pago:', error);
    res.status(500).json({ error: 'Error al eliminar método de pago' });
  }
});

module.exports = router;
