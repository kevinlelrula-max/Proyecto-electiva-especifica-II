export const InventarioSearchBar = ({ busqueda, setBusqueda }) => (
    <div className="input-group mb-4">
      <span className="input-group-text">🔍</span>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar producto por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
  