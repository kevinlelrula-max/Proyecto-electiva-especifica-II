const express = require("express");
const router = express.Router();
const pool = require("../db");

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM obtener_productos()");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ mensaje: "Error al obtener productos" });
  }
});

// Agregar un nuevo producto (con categoria_id)
router.post("/", async (req, res) => {
  const { nombre, precio, kilos, categoria_id } = req.body;

  if (
    !nombre ||
    typeof nombre !== "string" ||
    isNaN(Number(precio)) ||
    isNaN(Number(kilos)) ||
    isNaN(Number(categoria_id))
  ) {
    return res.status(400).json({ mensaje: "Datos inválidos al agregar producto" });
  }

  try {
    await pool.query("CALL agregar_producto($1, $2, $3, $4)", [
      nombre,
      Number(precio),
      Number(kilos),
      Number(categoria_id),
    ]);
    res.status(201).json({ mensaje: "Producto agregado correctamente" });
  } catch (error) {
    console.error("❌ Error al agregar producto:", error);
    res.status(500).json({ mensaje: "Error al agregar producto" });
  }
});

// Actualizar producto existente (con categoria_id)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, kilos, categoria_id } = req.body;

  console.log("📩 Body recibido para edición:", req.body); // Útil para debug

  if (
    !nombre ||
    typeof nombre !== "string" ||
    isNaN(Number(precio)) ||
    isNaN(Number(kilos)) ||
    isNaN(Number(categoria_id))
  ) {
    return res.status(400).json({ mensaje: "Datos inválidos al editar producto" });
  }

  try {
    await pool.query("CALL actualizar_producto($1, $2, $3, $4, $5)", [
      Number(id),
      nombre,
      Number(precio),
      Number(kilos),
      Number(categoria_id),
    ]);
    res.json({ mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    res.status(500).json({ mensaje: "Error al actualizar producto" });
  }
});

// Eliminar producto (borrado lógico)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("CALL eliminar_producto($1)", [Number(id)]);
    res.json({ mensaje: "Producto eliminado correctamente (estado = false)" });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    res.status(500).json({ mensaje: "Error al eliminar producto" });
  }
});

module.exports = router;
