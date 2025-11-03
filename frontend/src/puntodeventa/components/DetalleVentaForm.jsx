import { useEffect, useState } from "react";

export const DetalleVentaForm = ({
  productos,
  productoSeleccionado,
  setProductoSeleccionado,
  kilos,
  setKilos,
  metodoPago,
  setMetodoPago,
  agregarAlCarrito,
}) => {
  const [metodosPagoDisponibles, setMetodosPagoDisponibles] = useState([]);

  useEffect(() => {
    const obtenerMetodosPago = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/metodos-pago`);
        const data = await res.json();
        setMetodosPagoDisponibles(data);
      } catch (error) {
        console.error("❌ Error al cargar métodos de pago:", error);
      }
    };

    obtenerMetodosPago();
  }, []);

  return (
    <div className="card p-3">
      {/* Selector de producto */}
      <div className="mb-3">
        <label htmlFor="producto" className="form-label">Producto</label>
        <select
          id="producto"
          className="form-select"
          value={productoSeleccionado?.id || ""}
          onChange={(e) => {
            const prod = productos.find(p => p.id === parseInt(e.target.value));
            setProductoSeleccionado(prod);
          }}
        >
          <option value="">Seleccione</option>
          {productos.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Cantidad en kilos */}
      <div className="mb-3">
        <label htmlFor="kilos" className="form-label">Cantidad (kg)</label>
        <input
          type="number"
          id="kilos"
          className="form-control"
          min={1}
          value={kilos}
          onChange={(e) => setKilos(Number(e.target.value))}
        />
      </div>

      {/* Selector de método de pago */}
      <div className="mb-3">
        <label htmlFor="metodoPago" className="form-label">Tipo de Pago</label>
        <select
          id="metodoPago"
          className="form-select"
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
        >
          <option value="">Seleccione</option>
          {metodosPagoDisponibles.map((metodo) => (
            <option key={metodo.id} value={metodo.id}>
              {metodo.metodo}
            </option>
          ))}
        </select>
      </div>

      {/* Botón de agregar al carrito */}
      <button
        className="btn btn-dark w-100"
        onClick={agregarAlCarrito}
        disabled={!productoSeleccionado || !kilos || !metodoPago}
      >
        Agregar al Carrito
      </button>
    </div>
  );
};
