import React, { useState } from "react";
import { ModalEditarProducto } from "./ModalEditarProducto.jsx";

export const ProductoFila = ({ producto, editarProducto, eliminarProducto }) => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleGuardarCambios = (datosActualizados) => {
    const idFinal = producto.id ?? producto.id_producto;

    if (!idFinal || !datosActualizados) {
      console.error("❌ Datos incompletos para editar:", { idFinal, datosActualizados });
      return;
    }

    editarProducto(idFinal, datosActualizados);
  };

  const handleEliminar = () => {
    const idFinal = producto.id ?? producto.id_producto;
    eliminarProducto(idFinal);
  };

  const renderBadge = (kilos) => {
    if (kilos < 50) return <span className="badge bg-danger">🔴 Bajo</span>;
    if (kilos <= 100) return <span className="badge bg-warning text-dark">🟠 Medio</span>;
    return <span className="badge bg-success">🟢 Alto</span>;
  };

  return (
    <tr>
      <td>{producto.nombre}</td>
      <td>{producto.kilos}</td>
      <td>{renderBadge(producto.kilos)}</td>
      <td>${Number(producto.precio).toFixed(2)}</td>
      <td>{producto.categoria_nombre || producto.categoria || "Sin categoría"}</td>
      <td>
        <button
          className="btn btn-warning btn-sm me-2"
          onClick={() => setMostrarModal(true)}
        >
          Editar
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleEliminar}>
          Eliminar
        </button>

        {/* 🔧 ESTE MODAL ENVÍA LOS DATOS AL GUARDAR */}
        <ModalEditarProducto
          producto={producto}
          show={mostrarModal}
          onHide={() => setMostrarModal(false)}
          onGuardar={handleGuardarCambios} // <== Aquí estaba el error antes
        />
      </td>
    </tr>
  );
};
