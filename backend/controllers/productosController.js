const pool = require("../db");
const express = require("express"); 
const router = express.Router();  
exports.obtenerProductos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM obtener_productos()");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ mensaje: "Error al obtener los productos" });
  }
};

exports.agregarProducto = async (req, res) => {
  const { nombre, precio, kilos, categoria_id } = req.body;

  if (!nombre || isNaN(precio) || isNaN(kilos) || isNaN(categoria_id)) {
    return res.status(400).json({ mensaje: "Datos inválidos del producto" });
  }

  try {
    await pool.query("CALL agregar_producto($1, $2, $3, $4)", [
      nombre,
      precio,
      kilos,
      categoria_id
    ]);
    res.status(201).json({ mensaje: "Producto agregado correctamente" });
  } catch (error) {
    console.error("❌ Error al agregar producto:", error);
    res.status(500).json({ mensaje: "Error al agregar el producto" });
  }
};


exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, kilos, categoria_id } = req.body;

  if (!nombre || isNaN(precio) || isNaN(kilos) || isNaN(categoria_id)) {
    return res.status(400).json({ mensaje: "Datos inválidos" });
  }

  try {
    await pool.query("CALL actualizar_producto($1, $2, $3, $4, $5)", [
      id,
      nombre,
      precio,
      kilos,
      categoria_id
    ]);
    res.json({ mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    res.status(500).json({ mensaje: "Error al actualizar producto" });
  }
};



exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("SELECT eliminar_producto($1)", [id]);
    res.json({ mensaje: "Producto eliminado correctamente (estado = false)" });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    res.status(500).json({ mensaje: "Error al eliminar producto" });
  }
};
