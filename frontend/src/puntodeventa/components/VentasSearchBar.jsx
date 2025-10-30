import React from "react";

export const VentasSearchBar = ({ busqueda, setBusqueda }) => (
  <div className="input-group mb-4">
    <span className="input-group-text">🔍</span>
    <input
      type="text"
      className="form-control"
      placeholder="Buscar por nombre del cliente..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />
  </div>
);
