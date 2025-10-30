import { useState } from "react";
import { formatearNombreCompleto } from "../helpers";

export const ClientesTable = ({ clientes }) => {
  const [orden, setOrden] = useState({ campo: "fecha_registro", asc: false });
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 10;

  const ordenarClientes = (campo) => {
    const asc = orden.campo === campo ? !orden.asc : true;
    setOrden({ campo, asc });
  };

  const clientesOrdenados = [...clientes].sort((a, b) => {
    const campoA = a[orden.campo];
    const campoB = b[orden.campo];

    if (campoA === null || campoB === null) return 0;

    if (typeof campoA === "string") {
      return orden.asc
        ? campoA.localeCompare(campoB)
        : campoB.localeCompare(campoA);
    }

    return orden.asc ? campoA - campoB : campoB - campoA;
  });

  const indexInicio = (paginaActual - 1) * filasPorPagina;
  const clientesPaginados = clientesOrdenados.slice(
    indexInicio,
    indexInicio + filasPorPagina
  );

  const totalPaginas = Math.ceil(clientes.length / filasPorPagina);

  if (clientes.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        No hay resultados para la búsqueda.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle text-center border rounded overflow-hidden shadow-sm">
        <thead className="table-dark">
          <tr>
            <th onClick={() => ordenarClientes("email")} style={{ cursor: "pointer" }}>Correo ⬍</th>
            <th onClick={() => ordenarClientes("nombre")} style={{ cursor: "pointer" }}>Nombre ⬍</th>
            <th onClick={() => ordenarClientes("apellido")} style={{ cursor: "pointer" }}>Apellido ⬍</th>
            <th onClick={() => ordenarClientes("telefono")} style={{ cursor: "pointer" }}>Teléfono ⬍</th>
            <th>Dirección</th>
            <th onClick={() => ordenarClientes("fecha_registro")} style={{ cursor: "pointer" }}>Fecha de Registro ⬍</th>
          </tr>
        </thead>
        <tbody>
          {clientesPaginados.map((cliente, index) => (
            <tr key={index}>
              <td className="text-break">{cliente.email}</td>
              <td>{formatearNombreCompleto(cliente.nombre, "")}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.direccion}</td>
              <td>
                <span className="badge bg-light text-dark">
                  {new Date(cliente.fecha_registro).toLocaleString()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Navegación de páginas */}
      <div className="d-flex justify-content-between align-items-center">
        <span className="text-muted">
          Página {paginaActual} de {totalPaginas}
        </span>
        <div>
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual(paginaActual - 1)}
          >
            Anterior
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual(paginaActual + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
