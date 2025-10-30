import React from 'react';

const MetodoPagoFila = ({ metodo, onEditar, onEliminar }) => {
  return (
    <tr>
      <td>{metodo.id_metodo}</td>
      <td>{metodo.nombre_metodo}</td>
      <td>
        <button className="btn-accion btn-editar" onClick={onEditar}>
          ✏️ Editar
        </button>
        <button className="btn-accion btn-eliminar" onClick={() => onEliminar(metodo.id_metodo)}>
          🗑️ Eliminar
        </button>
      </td>
    </tr>
  );
};

export default MetodoPagoFila;
