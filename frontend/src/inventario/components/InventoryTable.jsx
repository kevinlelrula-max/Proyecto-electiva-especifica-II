import { ProductoFila } from "./ProductoFila";
import { useContext, useState } from "react";
import { ProductosContext } from "../context/ProductosContext";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import "./InventoryTable.css";

export const InventoryTable = ({ productos, eliminarProducto }) => {
  const { editarProducto } = useContext(ProductosContext);

  // 🔁 Ordenación
  const [orden, setOrden] = useState({ campo: null, asc: true });
  const ordenarProductos = (campo) => {
    const esAsc = orden.campo === campo ? !orden.asc : true;
    setOrden({ campo, asc: esAsc });
  };

  const iconoOrden = (campo) => {
    if (orden.campo !== campo) return <FaSort />;
    return orden.asc ? <FaSortUp /> : <FaSortDown />;
  };

  const productosOrdenados = [...productos].sort((a, b) => {
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

  // 📄 Paginación
  const [itemsPorPagina, setItemsPorPagina] = useState(5);
  const [paginaActual, setPaginaActual] = useState(1);

  const totalPaginas = Math.ceil(productosOrdenados.length / itemsPorPagina);

  const productosPagina = productosOrdenados.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const handleChangeItemsPorPagina = (e) => {
    setItemsPorPagina(parseInt(e.target.value));
    setPaginaActual(1); // Reiniciar a la primera página
  };

  return (
    <div className="table-responsive rounded shadow-sm mt-3">
      {/* SELECTOR DE CANTIDAD POR PÁGINA */}
      <div className="d-flex justify-content-end align-items-center mb-2">
        <label className="me-2 mb-0 fw-bold">Mostrar:</label>
        <select
          className="form-select form-select-sm"
          style={{ width: "80px" }}
          value={itemsPorPagina}
          onChange={handleChangeItemsPorPagina}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={productos.length}>Todos</option>
        </select>
      </div>

      <table className="table table-hover align-middle text-center border rounded overflow-hidden">
        <thead className="table-dark">
          <tr>
            <th onClick={() => ordenarProductos("nombre")} style={{ cursor: "pointer" }}>
              Nombre {iconoOrden("nombre")}
            </th>
            <th onClick={() => ordenarProductos("kilos")} style={{ cursor: "pointer" }}>
              Kilos en stock {iconoOrden("kilos")}
            </th>
            <th>Estado</th>
            <th onClick={() => ordenarProductos("precio")} style={{ cursor: "pointer" }}>
              Precio por kilo {iconoOrden("precio")}
            </th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {productosPagina.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-muted py-4">
                <em>No se encontraron productos.</em>
              </td>
            </tr>
          ) : (
            productosPagina.map((producto) => (
              <ProductoFila
                key={producto.id}
                producto={producto}
                editarProducto={editarProducto}
                eliminarProducto={eliminarProducto}
              />
            ))
          )}
        </tbody>
      </table>

      {/* PAGINADOR */}
      <div className="d-flex justify-content-center align-items-center mt-3">
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
            className={`btn btn-sm mx-1 ${paginaActual === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
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
    </div>
  );
};
