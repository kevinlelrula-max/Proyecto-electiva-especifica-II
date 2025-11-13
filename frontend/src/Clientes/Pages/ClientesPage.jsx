import React from "react";
import { FaUsers, FaFileExport } from "react-icons/fa";
import { useClientes } from "../hooks/useClientes";
import { ClienteSearchBar, ClientesTable } from "../components";

export const ClientesPage = () => {
  const { clientesFiltrados, busqueda, setBusqueda } = useClientes();

  // Exportación CSV simple (sin librerías externas)
  const exportarCSV = () => {
    if (!clientesFiltrados?.length) return;

    const keys = Array.from(
      new Set(clientesFiltrados.flatMap((c) => Object.keys(c ?? {})))
    );

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return "";
      const s = String(val).replace(/"/g, '""');
      return /[",\n;]/.test(s) ? `"${s}"` : s;
      };
    const header = keys.join(",");
    const rows = clientesFiltrados.map((obj) =>
      keys.map((k) => escapeCsv(obj[k])).join(",")
    );
    const csv = [header, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clientes_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hayClientes = clientesFiltrados && clientesFiltrados.length > 0;

  return (
    <div className="container-fluid mt-1 px-4" style={{ marginLeft: 0 }}>
      <div className="card shadow-lg border-0 p-4 rounded-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{ width: 48, height: 48, backgroundColor: "#eaf2ff" }}
            >
              <FaUsers className="text-primary fs-4" />
            </div>
            <div>
              <h3 className="fw-bold mb-0">Clientes registrados</h3>
              <small className="text-muted">
                Gestiona y busca clientes de forma rápida
              </small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-light text-dark border">
              Total:&nbsp;<strong>{clientesFiltrados.length}</strong>
            </span>
            <button
              type="button"
              className="btn btn-outline-secondary d-flex align-items-center"
              onClick={exportarCSV}
              title="Exportar a CSV"
            >
              <FaFileExport className="me-2" />
              Exportar
            </button>
          </div>
        </div>

        {/* Buscador */}
        <div className="bg-white">
          <ClienteSearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
        </div>

        {/* Tabla / Vacío */}
        <div className="mt-3">
          {hayClientes ? (
            <div className="table-responsive">
              {/* Si tu tabla es Bootstrap, puedes asegurarte de usar:
                  table table-hover table-striped align-middle
                  dentro de ClientesTable */}
              <ClientesTable clientes={clientesFiltrados} />
            </div>
          ) : (
            <div className="text-center text-muted py-5">
              <div className="display-6 mb-2">👀</div>
              <p className="mb-1">No se encontraron clientes</p>
              <small>Prueba con otra búsqueda.</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
