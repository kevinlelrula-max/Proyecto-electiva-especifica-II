import React, { useContext } from "react";
import { VentasContext } from "../context/VentasContext.jsx";
 
const HistorialVentas = () => {
  const { ventas } = useContext(VentasContext);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Historial de Ventas</h2>

      {ventas.length === 0 ? (
        <div className="alert alert-info text-center">No hay ventas registradas.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Cliente</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta, index) => (
                <tr key={index}>
                  <td>{venta.nombreCliente}</td>
                  <td>{venta.email}</td>
                  <td>{venta.telefono}</td>
                  <td>{venta.producto}</td>
                  <td>{venta.cantidad}</td>
                  <td>{new Date(venta.fechaCompra).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistorialVentas;
