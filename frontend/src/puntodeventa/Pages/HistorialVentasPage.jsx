import React, { useState } from "react";
import { useVentas } from "../hooks/useVentas";
import { VentasTable } from "../components/VentasTable";
import { VentasSearchBar } from "../components/VentasSearchBar";

export const HistorialVentasPage = () => {
  const { ventas } = useVentas();
  const [busqueda, setBusqueda] = useState("");

  const ventasFiltradas = ventas.filter((venta) =>
    venta.cliente.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container my-1">
      <div className="bg-white rounded shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
          <h3 className="fw-bold text-primary mb-0">📈 Historial de Ventas (General)</h3>
          <span className="badge bg-primary fs-6">
            Total: {ventasFiltradas.length}
          </span>
        </div>

        <VentasSearchBar busqueda={busqueda} setBusqueda={setBusqueda} />

        {ventasFiltradas.length === 0 ? (
          <div className="alert alert-warning text-center">
            No se encontraron ventas con ese nombre.
          </div>
        ) : (
          <VentasTable ventas={ventasFiltradas} />
        )}
      </div>
    </div>
  );
};
