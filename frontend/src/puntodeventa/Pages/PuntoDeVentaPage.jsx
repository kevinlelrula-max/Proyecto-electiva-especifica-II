import React, { useState, useContext } from "react";
import { ProductosContext } from "../../inventario/context";
import { useAuth } from "../../auth/context";
import { DetalleVentaForm } from "../components/DetalleVentaForm";
import { CarritoTable, TotalesVenta } from "../components";

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

    const subtotal = parseFloat(productoSeleccionado.precio) * kilos;

    setCarrito((prev) => [
      ...prev,
      {
        producto_id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        kilos,
        subtotal,
      },
    ]);

    setProductoSeleccionado(null);
    setKilos(1);
    setBusqueda("");
  };

  const eliminarDelCarrito = (index) => {
    setCarrito(carrito.filter((_, i) => i !== index));
  };

  const calcularTotal = () =>
    carrito.reduce((acc, item) => acc + item.subtotal, 0);

  const vaciarCarrito = () => setCarrito([]);

 const finalizarVenta = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ventas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cliente_id: usuario.id,
        administrador_id: 1, // puedes hacerlo dinámico luego si hay más admins
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
    <div className="container-fluid pt-4 px-5 punto-venta-wrapper" style={{ marginLeft: "70px" }}>
      <h3 className="text-center mb-4">Punto de Venta</h3>

      <div className="row">
        {}
        <div className="col-lg-8 mb-4">
          <div className="mb-3">
            <label className="form-label fw-bold">Productos</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese el código de barras o el nombre del producto"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="bg-secondary text-white px-4 py-2 rounded">
              $/ {calcularTotal().toFixed(2)}
            </h2>
          </div>

          <CarritoTable carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
        </div>

        {}
        <div className="col-lg-4">
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

          <TotalesVenta
            carrito={carrito}                  // ✅ Esto faltaba
            calcularTotal={calcularTotal}
            finalizarVenta={finalizarVenta}
            vaciarCarrito={vaciarCarrito}
          />
        </div>
      </div>
    </div>
  );
};

export default PuntoDeVentaPage;
