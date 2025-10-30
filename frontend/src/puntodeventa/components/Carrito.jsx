import React from "react";

const Carrito = ({ carrito, calcularTotal, finalizarVenta }) => {
  if (carrito.length === 0) return null;

  return (
    <div className="card p-4 mt-4">
      <h5>Productos en la venta</h5>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item, index) => (
            <tr key={index}>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio.toFixed(2)}</td>
              <td>${item.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="text-end">Total: ${calcularTotal().toFixed(2)}</h4>

      <div className="text-end">
        <button className="btn btn-success" onClick={finalizarVenta}>
          Finalizar Venta
        </button>
      </div>
    </div>
  );
};

export default Carrito;
