import React, { useState, useContext } from "react";
import { ProductosContext } from "../../inventario/context";
import { useAuth } from "../../auth/context";
import { DetalleVentaForm } from "../components/DetalleVentaForm";
import { CarritoTable, TotalesVenta } from "../components";
import { FaCashRegister, FaSearch } from "react-icons/fa";

export const PuntoDeVentaPage = () => {
  const { productos } = useContext(ProductosContext);
  const { usuario } = useAuth();

  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [kilos, setKilos] = useState(1);
  const [metodoPago, setMetodoPago] = useState("1");

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarAlCarrito = () => {
    if (!productoSeleccionado || kilos <= 0) return;

    const precioNum = parseFloat(productoSeleccionado.precio) || 0;
    const kilosNum = parseFloat(kilos) || 0;
    const subtotal = precioNum * kilosNum;

    setCarrito((prev) => [
      ...prev,
      {
        producto_id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        precio: precioNum,
        kilos: kilosNum,
        subtotal,
      },
    ]);

    setProductoSeleccionado(null);
    setKilos(1);
    setBusqueda("");
  };

  const eliminarDelCarrito = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  // ---- CÁLCULO CENTRALIZADO DE TOTALES ----
  const calcularTotal = () =>
    carrito.reduce((acc, item) => acc + (Number(item.subtotal) || 0), 0);

  const subtotal = calcularTotal();
  const iva = subtotal * 0.19;
  const total = subtotal + iva;
  // -----------------------------------------

  const vaciarCarrito = () => setCarrito([]);

  const finalizarVenta = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ventas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente_id: usuario.id,
          administrador_id: 1,
          metodo_pago_id: metodoPago,
          productos: carrito.map((item) => ({
            producto_id: item.producto_id,
            kilos: item.kilos,
            precio_unitario: item.precio,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al registrar la venta");

      alert("✅ Venta registrada correctamente");
      setCarrito([]);
    } catch (error) {
      console.error("Error al registrar venta:", error);
      alert("❌ No se pudo registrar la venta.");
    }
  };

  return (
    <div
      className="container-fluid pt-4 px-4 px-lg-5 punto-venta-wrapper"
      style={{ marginLeft: "70px" }}
    >
      {/* Encabezado tipo dashboard */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 52, height: 52, background: "#eaf2ff" }}
          >
            <FaCashRegister className="text-primary fs-4" />
          </div>
          <div>
            <h3 className="fw-bold mb-0">Punto de Venta</h3>
            <small className="text-muted">
              Agrega productos, calcula totales y registra la venta
            </small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-light text-dark border">
            Ítems:&nbsp;<strong>{carrito.length}</strong>
          </span>
          <span className="badge bg-success-subtle text-success border">
            Total:&nbsp;<strong>${subtotal.toFixed(2)}</strong>
          </span>
        </div>
      </div>

      <div className="row g-3">
        {/* Col izquierda: buscador + carrito */}
        <div className="col-lg-8">
          {/* Buscador */}
          <div className="card border-0 shadow-sm rounded-4 mb-3">
            <div className="card-body">
              <label className="form-label fw-bold mb-2">Productos</label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el código de barras o el nombre del producto"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Carrito */}
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header bg-white border-0 d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Carrito</h5>
              <span className="badge bg-dark-subtle text-dark border">
                Total:&nbsp;<strong>${subtotal.toFixed(2)}</strong>
              </span>
            </div>
            <div className="card-body pt-0">
              <CarritoTable
                carrito={carrito}
                eliminarDelCarrito={eliminarDelCarrito}
              />
            </div>
          </div>
        </div>

        {/* Col derecha: detalle + totales */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 mb-3">
            <div className="card-body">
              <h5 className="card-title mb-3">Detalle de venta</h5>
              <DetalleVentaForm
                productos={productosFiltrados}
                productoSeleccionado={productoSeleccionado}
                setProductoSeleccionado={setProductoSeleccionado}
                kilos={kilos}
                setKilos={setKilos}
                metodoPago={metodoPago}
                setMetodoPago={setMetodoPago}
                agregarAlCarrito={agregarAlCarrito}
              />
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <TotalesVenta
                subtotal={subtotal}
                iva={iva}
                total={total}
                finalizarVenta={finalizarVenta}
                vaciarCarrito={vaciarCarrito}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Espacio inferior */}
      <div style={{ height: 12 }} />
    </div>
  );
};

export default PuntoDeVentaPage;
