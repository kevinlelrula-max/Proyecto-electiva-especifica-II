import React, { useState } from "react";

export const CategoriaForm = ({ onAgregar }) => {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    onAgregar(nombre.trim());
    setNombre("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de la categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <button className="btn btn-success" type="submit">
          Agregar
        </button>
      </div>
    </form>
  );
};
