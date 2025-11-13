import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const TotalesVenta = ({ subtotal, iva, total, finalizarVenta, vaciarCarrito }) => {
  const format = (value) => Number(value || 0).toFixed(2);

  const subtotalFmt = format(subtotal);
  const ivaFmt = format(iva);
  const totalFmt = format(total);

  return (
    <>
      <hr />
      <div className="mb-2">
        <p className="mb-1">
          <strong>Subtotal:</strong> ${subtotalFmt}
        </p>
        <p className="mb-1">
          <strong>IVA (19%):</strong> ${ivaFmt}
        </p>
        <h5 className="fw-bold mt-2">Total a pagar: ${totalFmt}</h5>
      </div>

      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-primary me-2"
          onClick={finalizarVenta}
          disabled={Number(total) <= 0}
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
