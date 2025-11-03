import React from "react";
import { CategoriaForm } from "../components/CategoriaForm";
import { useCategorias } from "../hooks/useCategorias";

export const AgregarCategoria = () => {
  const { agregarCategoria } = useCategorias();

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Agregar Categoría</h3>
      <CategoriaForm onAgregar={agregarCategoria} />
    </div>
  );
};
