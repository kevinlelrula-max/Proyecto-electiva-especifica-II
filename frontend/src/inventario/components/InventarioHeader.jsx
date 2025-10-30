export const InventarioHeader = ({ total }) => (
    <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
      <h3 className="fw-bold text-primary mb-0">📦 Inventario de Productos</h3>
      <span className="badge bg-primary fs-6">Total: {total}</span>
    </div>
  );
  