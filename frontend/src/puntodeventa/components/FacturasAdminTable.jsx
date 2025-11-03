import React, { useState } from "react";
import { FaFilePdf, FaCalendarAlt, FaDollarSign, FaUser, FaSort } from "react-icons/fa";

export const FacturasAdminTable = ({ facturas }) => {
  const [orden, setOrden] = useState("asc");
  const [columnaOrden, setColumnaOrden] = useState("factura_id");
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const cambiarOrden = (columna) => {
    if (columnaOrden === columna) {
      setOrden(orden === "asc" ? "desc" : "asc");
    } else {
      setColumnaOrden(columna);
      setOrden("asc");
    }
  };

  const facturasOrdenadas = [...facturas].sort((a, b) => {
    const valorA = a[columnaOrden];
    const valorB = b[columnaOrden];

    if (typeof valorA === "string") {
      return orden === "asc"
        ? valorA.localeCompare(valorB)
        : valorB.localeCompare(valorA);
    }

    return orden === "asc" ? valorA - valorB : valorB - valorA;
  });

  const totalPaginas = Math.ceil(facturasOrdenadas.length / elementosPorPagina);
  const facturasPaginadas = facturasOrdenadas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <div className="table-responsive shadow-sm rounded p-3 bg-white">
      <table className="table table-hover table-striped align-middle">
        <thead className="table-dark text-center">
          <tr>
            <th onClick={() => cambiarOrden("factura_id")} style={{ cursor: "pointer" }}>
              ID <FaSort />
            </th>
            <th onClick={() => cambiarOrden("cliente")} style={{ cursor: "pointer" }}>
              <FaUser /> Cliente
            </th>
            <th onClick={() => cambiarOrden("fecha")} style={{ cursor: "pointer" }}>
              <FaCalendarAlt /> Fecha
            </th>
            <th onClick={() => cambiarOrden("total")} style={{ cursor: "pointer" }}>
              <FaDollarSign /> Total
            </th>
            <th><FaFilePdf /> PDF</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {facturasPaginadas.map((factura) => (
            <tr key={factura.factura_id}>
              <td><span className="badge bg-primary">{factura.factura_id}</span></td>
              <td>{factura.cliente}</td>
              <td>{new Date(factura.fecha).toLocaleString()}</td>
              <td className="fw-bold text-success">${Number(factura.total).toFixed(2)}</td>
              <td>
                <a
                  href={`${import.meta.env.VITE_API_URL}/api/ventas/factura/pdf/${factura.factura_id}`}
                  className="btn btn-outline-danger btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFilePdf className="me-1" /> Ver PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <div>
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
