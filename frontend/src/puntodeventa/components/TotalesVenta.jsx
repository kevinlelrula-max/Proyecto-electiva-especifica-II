import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { calcularTotalesVenta } from "../helpers"; 

export const TotalesVenta = ({ carrito, finalizarVenta, vaciarCarrito }) => {
  const { subtotal, iva, total } = calcularTotalesVenta(carrito);

  return (
    <>
      <hr />
      <div className="mb-2">
        <p className="mb-1"><strong>Subtotal:</strong> ${subtotal}</p>
        <p className="mb-1"><strong>IVA (19%):</strong> ${iva}</p>
        <h5 className="fw-bold mt-2">Total a pagar: ${total}</h5>
      </div>

      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-primary me-2"
          onClick={finalizarVenta}
          disabled={parseFloat(total) <= 0}
        >
          Realizar Venta
        </button>
        <button className="btn btn-danger" onClick={vaciarCarrito}>
          Vaciar Listado
        </button>
      </div>
    </>
  );
};
