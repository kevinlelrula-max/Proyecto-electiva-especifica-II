import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const HistorialVentasCliente = () => {
  const { usuario } = useAuth();
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ventas/cliente/${usuario.id}`);
        const data = await res.json();
        setVentas(data);
      } catch (error) {
        console.error("Error al cargar ventas:", error);
      }
    };

    if (usuario?.id) {
      obtenerVentas();
    }
  }, [usuario]);

  return (
    <div className="container mt-4" style={{ marginLeft: "100px" }}>
      <h3 className="text-center mb-2">Historial de Compras</h3>

      {ventas.length === 0 ? (
        <p className="text-center text-muted">No se han registrado ventas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped shadow-sm">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Kilos</th>
                <th>Precio Unitario</th>
                <th>Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {ventas.map((venta, index) => (
                <tr key={venta.id}>
                  <td>{index + 1}</td>
                  <td>{venta.producto}</td>
                  <td>{venta.kilos}</td>
                  <td>${Number(venta.precio_unitario).toFixed(2)}</td>
                  <td>${Number(venta.total).toFixed(2)}</td>
                  <td>{new Date(venta.fecha).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistorialVentasCliente;
