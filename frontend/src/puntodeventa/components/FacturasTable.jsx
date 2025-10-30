import React, { useState } from "react";
import {
  FaFilePdf,
  FaCalendarAlt,
  FaDollarSign,
  FaUser,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaHashtag,
} from "react-icons/fa";

export const FacturasTable = ({ facturas }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [filasPorPagina, setFilasPorPagina] = useState(10);
  const [columnaOrden, setColumnaOrden] = useState(null);
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  if (facturas.length === 0) {
    return (
      <div className="alert alert-warning text-center shadow-sm">
        No hay facturas registradas.
      </div>
    );
  }

  const iconoOrden = (columna) => {
    if (columnaOrden !== columna) return <FaSort />;
    return ordenAscendente ? <FaSortUp /> : <FaSortDown />;
  };

  const ordenarPor = (columna) => {
    if (columna === columnaOrden) {
      setOrdenAscendente(!ordenAscendente);
    } else {
      setColumnaOrden(columna);
      setOrdenAscendente(true);
    }
  };

  const facturasOrdenadas = [...facturas].sort((a, b) => {
    if (!columnaOrden) return 0;
    const valorA = a[columnaOrden];
    const valorB = b[columnaOrden];

    if (columnaOrden === "fecha") {
      return ordenAscendente
        ? new Date(valorA) - new Date(valorB)
        : new Date(valorB) - new Date(valorA);
    }

    if (typeof valorA === "number") {
      return ordenAscendente ? valorA - valorB : valorB - valorA;
    }

    return ordenAscendente
      ? valorA.localeCompare(valorB)
      : valorB.localeCompare(valorA);
  });

  // Paginación
  const totalPaginas = Math.ceil(facturasOrdenadas.length / filasPorPagina);
  const inicio = (paginaActual - 1) * filasPorPagina;
  const facturasPaginadas = facturasOrdenadas.slice(
    inicio,
    inicio + filasPorPagina
  );

  const cambiarPagina = (nueva) => {
    if (nueva >= 1 && nueva <= totalPaginas) {
      setPaginaActual(nueva);
    }
  };

  return (
    <div className="table-responsive shadow rounded p-3 bg-light">
      <table className="table table-striped align-middle text-center">
        <thead className="table-dark">
          <tr>
            <th onClick={() => ordenarPor("factura_id")} style={{ cursor: "pointer" }}>
              <FaHashtag /> ID {iconoOrden("factura_id")}
            </th>
            <th onClick={() => ordenarPor("cliente")} style={{ cursor: "pointer" }}>
              <FaUser /> Cliente {iconoOrden("cliente")}
            </th>
            <th onClick={() => ordenarPor("fecha")} style={{ cursor: "pointer" }}>
              <FaCalendarAlt /> Fecha {iconoOrden("fecha")}
            </th>
            <th onClick={() => ordenarPor("total")} style={{ cursor: "pointer" }}>
              <FaDollarSign /> Total {iconoOrden("total")}
            </th>
            <th><FaFilePdf /> PDF</th>
          </tr>
        </thead>
        <tbody>
          {facturasPaginadas.map((factura) => (
            <tr key={factura.factura_id}>
              <td><span className="badge bg-primary">{factura.factura_id}</span></td>
              <td className="fw-semibold">{factura.cliente}</td>
              <td>{new Date(factura.fecha).toLocaleString()}</td>
              <td className="fw-bold text-success">
                ${Number(factura.total).toFixed(2)}
              </td>
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

      {/* Controles de paginación */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Mostrando {inicio + 1} a {Math.min(inicio + filasPorPagina, facturas.length)} de {facturas.length}
        </div>
        <div>
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>
          <span className="fw-bold">
            Página {paginaActual} de {totalPaginas}
          </span>
          <button
            className="btn btn-outline-secondary btn-sm ms-2"
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
