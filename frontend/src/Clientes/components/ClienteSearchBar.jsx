import { FaSearch } from "react-icons/fa";

export const ClienteSearchBar = ({ busqueda, setBusqueda }) => (
  <div className="mb-3">
    <div className="input-group">
      <span className="input-group-text bg-light">
        <FaSearch />
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por nombre, apellido o correo"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  </div>
);
