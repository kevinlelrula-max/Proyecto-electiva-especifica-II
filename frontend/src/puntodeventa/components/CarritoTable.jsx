import React from "react";

export const CarritoTable = ({ carrito, eliminarDelCarrito }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered text-center align-middle">
        <thead className="table-secondary">
          <tr>
            <th>Código</th>
            <th>Producto</th>
            <th>Cantidad (kg)</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-muted">
                Ningún dato disponible en esta tabla ☹️
              </td>
            </tr>
          ) : (
            carrito.map((item, index) => (
              <tr key={index}>
                <td>{item.codigo || item.id}</td>
                <td>{item.nombre}</td>
                <td>{Number(item.kilos).toFixed(2)} kg</td>
                <td>${Number(item.precio).toFixed(2)}</td>
                <td>${Number(item.subtotal).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminarDelCarrito(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
