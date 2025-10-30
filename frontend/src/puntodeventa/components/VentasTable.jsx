import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export const VentasTable = ({ ventas }) => {
  const [orden, setOrden] = useState({ campo: null, asc: true });
  const [paginaActual, setPaginaActual] = useState(1);
  const [itemsPorPagina, setItemsPorPagina] = useState(10);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const ordenar = (campo) => {
    const asc = orden.campo === campo ? !orden.asc : true;
    setOrden({ campo, asc });
  };

  const iconoOrden = (campo) => {
    if (orden.campo !== campo) return <FaSort />;
    return orden.asc ? <FaSortUp /> : <FaSortDown />;
  };

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleString("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const ventasOrdenadas = [...ventas].sort((a, b) => {
    const campo = orden.campo;
    if (!campo) return 0;
    const valA = a[campo];
    const valB = b[campo];
    return typeof valA === "string"
      ? orden.asc
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA)
      : orden.asc
      ? valA - valB
      : valB - valA;
  });

  const totalPaginas = Math.ceil(ventasOrdenadas.length / itemsPorPagina);
  const ventasPagina = ventasOrdenadas.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  const cambiarPagina = (nueva) => {
    if (nueva >= 1 && nueva <= totalPaginas) setPaginaActual(nueva);
  };

  const cambiarItemsPorPagina = (e) => {
    setItemsPorPagina(Number(e.target.value));
    setPaginaActual(1);
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-2">
        <label className="me-2 fw-bold">Mostrar:</label>
        <select
          className="form-select form-select-sm"
          style={{ width: "80px" }}
          value={itemsPorPagina}
          onChange={cambiarItemsPorPagina}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={ventas.length}>Todos</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th onClick={() => ordenar("id_venta")} style={{ cursor: "pointer" }}>
                ID Venta {iconoOrden("id_venta")}
              </th>
              <th onClick={() => ordenar("cliente")} style={{ cursor: "pointer" }}>
                Cliente {iconoOrden("cliente")}
              </th>
              <th onClick={() => ordenar("metodo_pago")} style={{ cursor: "pointer" }}>
                Método de Pago {iconoOrden("metodo_pago")}
              </th>
              <th onClick={() => ordenar("total")} style={{ cursor: "pointer" }}>
                Total Venta {iconoOrden("total")}
              </th>
              <th onClick={() => ordenar("fecha")} style={{ cursor: "pointer" }}>
                Fecha {iconoOrden("fecha")}
              </th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {ventasPagina.map((venta) => (
              <tr key={venta.id_venta}>
                <td>{venta.id_venta}</td>
                <td>{venta.cliente}</td>
                <td>{venta.metodo_pago}</td>
                <td className={venta.total > 5000 ? "text-success fw-bold" : "fw-bold"}>
                  ${Number(venta.total).toFixed(2)}
                </td>
                <td>{formatearFecha(venta.fecha)}</td>
                <td>
                  <button
                    className="btn btn-outline-info btn-sm"
                    onClick={() => setVentaSeleccionada(venta)}
                    data-bs-toggle="modal"
                    data-bs-target="#modalDetalleVenta"
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {}
      <div className="d-flex justify-content-center align-items-center mt-2">
        <button
          className="btn btn-outline-secondary btn-sm me-2"
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        {[...Array(totalPaginas)].map((_, i) => (
          <button
            key={i}
            className={`btn btn-sm mx-1 ${
              paginaActual === i + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => cambiarPagina(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-outline-secondary btn-sm ms-2"
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>

      {}
      <div className="modal fade" id="modalDetalleVenta" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {ventaSeleccionada && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <p><strong>Cliente:</strong> {ventaSeleccionada.cliente}</p>
                  <p><strong>Método de Pago:</strong> {ventaSeleccionada.metodo_pago}</p>
                  <p><strong>Total:</strong> ${Number(ventaSeleccionada.total).toFixed(2)}</p>
                  <p><strong>Fecha:</strong> {formatearFecha(ventaSeleccionada.fecha)}</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
