import React, { useMemo } from "react";
import { FaReceipt, FaFileExport } from "react-icons/fa";
import { useHistorialVentasCliente } from "../hooks/useHistorialVentasCliente";
import { HistorialVentasTable } from "../components";

export const HistorialVentasClientePage = () => {
  const ventas = useHistorialVentasCliente() || [];

  // === Helpers numéricos/moneda ===
  const num = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };
  const totalItem = (v) => {
    // Usa el primero disponible: total | subtotal | (precio_unitario * kilos)
    const t = v?.total;
    const s = v?.subtotal;
    const pu = v?.precio_unitario;
    const kg = v?.kilos;
    return num(t ?? s ?? (num(pu) * num(kg)));
  };

  const money = useMemo(
    () =>
      new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      }),
    []
  );

  // === Métricas ===
  const totalGastado = useMemo(
    () => ventas.reduce((acc, v) => acc + totalItem(v), 0),
    [ventas]
  );
  const totalCompras = ventas.length;
  const ticketPromedio = totalCompras ? totalGastado / totalCompras : 0;

  // === Exportar CSV ===
  const exportarCSV = () => {
    if (!ventas.length) return;
    const keys = Array.from(new Set(ventas.flatMap((v) => Object.keys(v ?? {}))));
    const esc = (val) => {
      if (val === null || val === undefined) return "";
      const s = String(val).replace(/"/g, '""');
      return /[",\n;]/.test(s) ? `"${s}"` : s;
    };
    const header = keys.join(",");
    const rows = ventas.map((o) => keys.map((k) => esc(o[k])).join(","));
    const csv = [header, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `historial_compras_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hayVentas = totalCompras > 0;

  return (
    <div
      className="container-fluid px-3 px-md-4"
      style={{
        marginLeft: -50,     // ⬅️ lo acercamos al sidebar
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{
          // ⬅️ ensanchado total, restando menos para pegarlo a la izquierda
          width: `calc(100vw - 270px)`,
        }}
      >
        {/* Header */}
        <div className="p-4 pb-3 border-bottom bg-white">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 52, height: 52, background: "#eaf2ff" }}
              >
                <FaReceipt className="text-primary fs-4" />
              </div>
              <div>
                <h3 className="fw-bold m-0">Historial de Compras</h3>
                <small className="text-muted">
                  Consulta tus compras y descárgalas en CSV
                </small>
              </div>
            </div>

            <div className="d-flex align-items-center flex-wrap gap-2">
              <span className="badge bg-light text-dark border">
                Compras:&nbsp;<strong>{totalCompras}</strong>
              </span>
              <span className="badge bg-light text-dark border">
                Total gastado:&nbsp;<strong>{money.format(totalGastado)}</strong>
              </span>
              <span className="badge bg-light text-dark border">
                Ticket promedio:&nbsp;<strong>{money.format(ticketPromedio)}</strong>
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
        </div>

        {/* Tabla / Vacío */}
        <div className="p-4">
          {hayVentas ? (
            <div className="table-responsive">
              {/* Asegúrate de que la tabla interna use:
                  table table-hover table-striped align-middle */}
              <HistorialVentasTable ventas={ventas} />
            </div>
          ) : (
            <div className="text-center text-muted py-5">
              <div className="display-6 mb-2">🧾</div>
              <p className="mb-1">Aún no tienes compras registradas</p>
              <small>Cuando realices compras, aparecerán aquí.</small>
            </div>
          )}
        </div>
      </div>

      <div style={{ height: 16 }} />
    </div>
  );
};
