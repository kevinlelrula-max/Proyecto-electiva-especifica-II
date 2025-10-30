import React from "react";

export const CategoriaFila = ({ categoria, onEliminar, onEditar }) => {
  const handleEliminar = () => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      onEliminar(categoria.id);
    }
  };

  return (
    <tr>
      <td>{categoria.id}</td>
      <td>{categoria.nombre}</td>
      <td>
        <div className="d-flex justify-content-center gap-2">
          <button onClick={() => onEditar(categoria.id)} className="btn btn-primary btn-sm">
            Editar
          </button>
          <button onClick={handleEliminar} className="btn btn-danger btn-sm">
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};
