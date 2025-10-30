import React, { useContext, useEffect, useState } from "react";
import { VentasContext } from "../context/VentasContext";
import { ProductosContext } from "../../inventario/context";
import { useAuth } from "../../auth/context";
import { toast } from "sonner";
import { useRegistroVenta } from "../hooks/useRegistroVenta";

export const RegistroVenta = () => {
  const { registrarVenta } = useContext(VentasContext);
  const { productos } = useContext(ProductosContext);
  const { usuario } = useAuth();

  const [metodosPago, setMetodosPago] = useState([]);

  const { venta, handleChange, handleSubmit } = useRegistroVenta(
    productos,
    async (ventaData) => {
      await registrarVenta(ventaData);
    },
    usuario,
    toast
  );

  useEffect(() => {
    const cargarMetodos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/metodos-pago`);
        const data = await res.json();
        setMetodosPago(data);
      } catch (error) {
        console.error("❌ Error al cargar métodos de pago:", error);
      }
    };
    cargarMetodos();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Registrar Venta</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email del Cliente</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={venta.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Producto</label>
              <select
                className="form-select"
                name="producto"
                value={venta.producto}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un producto</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.nombre}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Cantidad (kg)</label>
              <input
                type="number"
                className="form-control"
                name="cantidad"
                value={venta.cantidad}
                onChange={handleChange}
                min={0.1}
                step={0.1}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Método de Pago</label>
              <select
                name="metodo_pago_id"
                className="form-select"
                value={venta.metodo_pago_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un método</option>
                {metodosPago.map((mp) => (
                  <option key={mp.id} value={mp.id}>
                    {mp.metodo}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                Registrar Venta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroVenta;
