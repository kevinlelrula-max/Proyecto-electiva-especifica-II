import { FaFish, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

export const HistorialVentasTable = ({ ventas }) => {
  if (!Array.isArray(ventas)) {
    return (
      <div className="alert alert-danger text-center shadow-sm">
        Error al cargar los datos de ventas.
      </div>
    );
  }

  return ventas.length === 0 ? (
    <div className="alert alert-warning text-center shadow-sm">
      No se han registrado compras.
    </div>
  ) : (
    <div className="table-responsive shadow rounded p-3 bg-light">
      <table className="table table-striped align-middle">
        <thead className="table-dark text-center">
          <tr>
            <th>#</th>
            <th><FaFish /> Producto</th>
            <th>Kilos</th>
            <th><FaDollarSign /> Unitario</th>
            <th>Subtotal</th>
            <th><FaCalendarAlt /> Fecha</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {ventas.map((venta, index) => (
            <tr key={index}>
              <td><span className="badge bg-primary">{index + 1}</span></td>
              <td className="fw-semibold">{venta.producto}</td>
              <td>{venta.kilos} kg</td>
              <td><strong>${Number(venta.precio_unitario).toFixed(2)}</strong></td>
              <td className="text-success fw-bold">${Number(venta.subtotal).toFixed(2)}</td>
              <td>{new Date(venta.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
