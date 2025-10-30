import { FaUsers } from "react-icons/fa";
import { useClientes } from "../hooks/useClientes";
import { ClienteSearchBar, ClientesTable } from "../components";

export const ClientesPage = () => {
  const { clientesFiltrados, busqueda, setBusqueda } = useClientes();

  return (
    <div className="container mt-1" style={{ marginLeft: "0px" }}>
      <div className="card shadow-lg border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
          <h3 className="fw-bold text-primary m-0">
            <FaUsers className="me-2" />
            Clientes Registrados
          </h3>
          <span className="badge bg-info text-dark fs-6">
            Total: {clientesFiltrados.length}
          </span>
        </div>

        <ClienteSearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
        <ClientesTable clientes={clientesFiltrados} />
      </div>
    </div>
  );
};
