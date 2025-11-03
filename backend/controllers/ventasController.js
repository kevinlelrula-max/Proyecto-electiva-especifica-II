const pool = require("../db");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const express = require("express");
const router = express.Router();

exports.registrarVenta = async (req, res) => {
  const { cliente_id, administrador_id, metodo_pago_id, productos } = req.body;

  try {
    await pool.query(
      `CALL registrar_venta($1, $2, $3, $4)`,
      [cliente_id, administrador_id, metodo_pago_id, JSON.stringify(productos)]
    );

    res.status(201).json({ mensaje: "Venta registrada exitosamente con procedimiento almacenado" });
  } catch (error) {
    console.error("❌ Error al registrar venta con procedimiento:", error);
    res.status(500).json({ mensaje: "Error al registrar la venta", error: error.message });
  }
};

exports.historialVentas = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM obtener_historial_ventas($1)`,
      [usuario_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener historial:", error);
    res.status(500).json({ mensaje: "Error al obtener historial" });
  }
};

exports.historialDetalleCliente = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM obtener_detalle_ventas($1)`, [usuario_id]);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener historial detallado:", error);
    res.status(500).json({ mensaje: "Error al obtener historial detallado" });
  }
};

exports.obtenerTodasLasVentas = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        v.id AS venta_id,
        p.nombre || ' ' || p.apellido AS cliente, 
        mp.metodo AS metodo_pago,
        v.total, 
        v.fecha
      FROM ventas v
      JOIN persona p ON v.cliente_id = p.id
      JOIN metodo_pago mp ON v.metodo_pago_id = mp.id
      ORDER BY v.fecha DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener ventas:", error);
    res.status(500).json({ mensaje: "Error al obtener ventas" });
  }
};

exports.obtenerDatosGraficas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM obtener_datos_grafica()');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener datos de la gráfica:', error);
    res.status(500).json({ mensaje: 'Error al obtener datos de la gráfica', error: error.message });
  }
};

exports.obtenerFacturasCliente = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        v.id AS factura_id,
        v.fecha,
        v.total,
        v.ruta_pdf,
        p.nombre || ' ' || p.apellido AS cliente
      FROM ventas v
      JOIN persona p ON v.cliente_id = p.id
      WHERE v.cliente_id = $1
      ORDER BY v.fecha DESC
    `, [usuario_id]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener facturas del cliente:', error);
    res.status(500).json({ mensaje: 'Error al obtener facturas del cliente', error: error.message });
  }
};

exports.descargarFacturaPDF = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ mensaje: "ID de venta inválido" });
  }

  try {
    const facturaQuery = await pool.query(`
      SELECT v.id, v.fecha, v.total, p.nombre || ' ' || p.apellido AS cliente
      FROM ventas v
      JOIN persona p ON v.cliente_id = p.id
      WHERE v.id = $1
    `, [id]);

    if (facturaQuery.rowCount === 0) {
      return res.status(404).json({ mensaje: "Venta no encontrada" });
    }

    const detalleQuery = await pool.query(`
      SELECT 
        pr.nombre, 
        dv.kilos, 
        dv.precio_unitario, 
        (dv.kilos * dv.precio_unitario) AS subtotal
      FROM detalle_venta dv
      JOIN productos pr ON dv.producto_id = pr.id
      WHERE dv.venta_id = $1
    `, [id]);

    const factura = facturaQuery.rows[0];
    const detalles = detalleQuery.rows;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=factura_${id}.pdf`);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    doc.fontSize(20).text("Pesquera Estrada", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(16).text(`Factura #${factura.id}`, { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Cliente: ${factura.cliente}`);
    doc.text(`Fecha: ${new Date(factura.fecha).toLocaleString()}`);
    doc.text(`Total: $${Number(factura.total).toFixed(2)}`);
    doc.moveDown();

    doc.font("Helvetica-Bold").text("Producto     Kilos     Unitario     Subtotal");
    doc.font("Helvetica");
    detalles.forEach((item) => {
      doc.text(`${item.nombre}     ${item.kilos} kg     $${item.precio_unitario}     $${item.subtotal}`);
    });

    doc.moveDown(2);
    doc.fontSize(12).fillColor("gray").text("Gracias por su compra.", { align: "center" });
    doc.end();

  } catch (error) {
    console.error("❌ Error generando PDF:", error);
    res.status(500).json({ mensaje: "Error al generar la factura en PDF" });
  }
};

exports.obtenerTodasLasFacturas = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        v.id AS factura_id,
        v.fecha,
        v.total,
        p.nombre || ' ' || p.apellido AS cliente,
        v.ruta_pdf
      FROM ventas v
      JOIN persona p ON v.cliente_id = p.id
      ORDER BY v.fecha DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener facturas:", error);
    res.status(500).json({ mensaje: "Error al obtener facturas" });
  }
};

exports.obtenerProductosMasVendidos = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.nombre, 
        SUM(dv.kilos) AS total_vendido
      FROM detalle_venta dv
      JOIN productos p ON dv.producto_id = p.id
      GROUP BY p.nombre
      ORDER BY total_vendido DESC
      LIMIT 5
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener productos más vendidos:", error);
    res.status(500).json({ mensaje: "Error al obtener productos más vendidos" });
  }
};

exports.obtenerVentasDetalladas = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM obtener_historial_ventas_detallado()`);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener historial detallado:", error);
    res.status(500).json({ mensaje: "Error al obtener historial detallado" });
  }
};


