const express = require("express");
const router = express.Router();
const ventasController = require("../controllers/ventasController");
const pool = require("../db");
const PDFDocument = require("pdfkit");

// ✅ Registrar una venta
router.post("/", ventasController.registrarVenta);

// ✅ Historial por cliente
router.get("/cliente/:usuario_id", ventasController.historialVentas);

// ✅ Historial con detalle por cliente
router.get("/cliente/:usuario_id/detalle", ventasController.historialDetalleCliente);

// ✅ Historial completo (admin)
router.get("/", ventasController.obtenerTodasLasVentas);

// ✅ Historial con nombres reales (cliente, admin y método de pago)
router.get("/detalle/general", ventasController.obtenerVentasDetalladas);

// ✅ Productos más vendidos (gráficas)
router.get("/masvendidos", ventasController.obtenerProductosMasVendidos);

// ✅ Datos de ventas para gráficas (detalle por producto y fecha)
router.get("/graficas/detalle-ventas", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.nombre AS producto,
        dv.kilos,
        dv.kilos * dv.precio_unitario AS subtotal,
        v.fecha
      FROM detalle_venta dv
      JOIN productos p ON dv.producto_id = p.id
      JOIN ventas v ON dv.venta_id = v.id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener detalle de ventas:", error);
    res.status(500).json({ mensaje: "Error al obtener detalle de ventas", error: error.message });
  }
});

// ✅ Facturas por cliente
router.get("/facturas/cliente/:usuario_id", ventasController.obtenerFacturasCliente);

// ✅ Todas las facturas (admin)
router.get("/facturas", ventasController.obtenerTodasLasFacturas);

// ✅ Descargar factura en PDF
router.get("/factura/pdf/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ mensaje: "ID de venta inválido" });
  }

  const doc = new PDFDocument({ margin: 50 });

  try {
    const ventaQuery = await pool.query(`
      SELECT v.id, v.fecha, v.total, 
             p.nombre || ' ' || p.apellido AS cliente,
             mp.metodo AS metodo_pago
      FROM ventas v
      JOIN persona p ON v.cliente_id = p.id
      JOIN metodo_pago mp ON v.metodo_pago_id = mp.id
      WHERE v.id = $1
    `, [id]);

    const detalleQuery = await pool.query(`
      SELECT pr.nombre, dv.kilos, dv.precio_unitario, 
             (dv.kilos * dv.precio_unitario) AS subtotal
      FROM detalle_venta dv
      JOIN productos pr ON dv.producto_id = pr.id
      WHERE dv.venta_id = $1
    `, [id]);

    if (ventaQuery.rowCount === 0) {
      return res.status(404).json({ mensaje: "Venta no encontrada" });
    }

    const venta = ventaQuery.rows[0];
    const detalles = detalleQuery.rows;

    res.setHeader("Content-Disposition", `attachment; filename=factura_${id}.pdf`);
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    // 🧾 Encabezado
    doc.fontSize(20).text("Pesquera Estrada", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(16).text(`Factura #${venta.id}`, { align: "center" });
    doc.moveDown(1.5);

    doc.fontSize(12).fillColor("black").text(`Cliente: ${venta.cliente}`);
    doc.text(`Método de Pago: ${venta.metodo_pago}`);
    doc.text(`Fecha: ${new Date(venta.fecha).toLocaleString()}`);
    doc.text(`Total: $${Number(venta.total).toFixed(2)}`);
    doc.moveDown(1);

    // 🧾 Detalle
    doc.fillColor("black").fontSize(13).text("Detalle de la compra:", { underline: true });
    doc.moveDown(0.8);

    const startX = 60;
    const y = doc.y;
    const colSpacing = 110;

    doc.font("Helvetica-Bold").fontSize(12)
      .text("Producto", startX, y)
      .text("Kilos", startX + colSpacing, y)
      .text("Precio", startX + colSpacing * 2, y)
      .text("Subtotal", startX + colSpacing * 3, y);

    doc.moveTo(50, y + 15).lineTo(550, y + 15).stroke();
    let positionY = y + 25;

    doc.font("Helvetica");
    detalles.forEach((item) => {
      doc.fontSize(11)
        .text(item.nombre, startX, positionY)
        .text(`${Number(item.kilos).toFixed(2)} kg`, startX + colSpacing, positionY)
        .text(`$${Number(item.precio_unitario).toFixed(2)}`, startX + colSpacing * 2, positionY)
        .text(`$${Number(item.subtotal).toFixed(2)}`, startX + colSpacing * 3, positionY);
      positionY += 20;
    });

    doc.moveDown(2);
    doc.fontSize(12).fillColor("#666").text("Gracias por su compra.", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("❌ Error generando PDF:", error);
    res.status(500).json({ mensaje: "Error al generar la factura en PDF" });
  }
});

module.exports = router;
