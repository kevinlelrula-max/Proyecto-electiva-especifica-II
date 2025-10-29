import React from "react";
import { useHistorialVentasCliente } from "../hooks/useHistorialVentasCliente";
import { HistorialVentasTable } from "../components";

export const HistorialVentasClientePage = () => {
  const ventas = useHistorialVentasCliente();

  return (
    <div className="container mt-5" style={{ marginLeft: "70px" }}>
      <h2 className="text-center mb-4 fw-bold">🧾 Historial de Compras</h2>
      <HistorialVentasTable ventas={ventas} />
    </div>
  );
};
