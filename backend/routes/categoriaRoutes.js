const express = require('express');
const router = express.Router();
const {
  obtenerCategorias,
  obtenerCategoriaPorId,
  registrarCategoria,
  actualizarCategoria,
  eliminarCategoria
} = require('../controllers/categoriaController'); // 👈 sin punto, como preferiste

// Obtener todas las categorías activas
router.get('/', obtenerCategorias);

// Obtener categoría por ID
router.get('/:id', obtenerCategoriaPorId);

// Registrar (o reactivar) nueva categoría
router.post('/', registrarCategoria);

// Actualizar categoría
router.put('/:id', actualizarCategoria);

// Eliminar lógica (estado = false)
router.delete('/:id', eliminarCategoria);

module.exports = router;
