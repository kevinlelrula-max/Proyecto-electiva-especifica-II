import React, { useState } from "react";
import { useCategorias } from "../hooks/useCategorias";
import { CategoriaFila } from "../components/CategoriaFila";
import { Link } from "react-router-dom";
import { ModalEditarCategoria } from "../components/ModalEditarCategoria";

export const HistorialCategorias = () => {
  const { categorias, eliminarCategoriaPorId } = useCategorias();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaIdEditar, setCategoriaIdEditar] = useState(null);

  // 🔢 Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  // ↕️ Ordenación
  const [columnaOrden, setColumnaOrden] = useState("id");
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  const abrirModalEditar = (id) => {
    setCategoriaIdEditar(id);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setCategoriaIdEditar(null);
  };

  // 🧠 Ordenar categorías
  const categoriasOrdenadas = [...categorias].sort((a, b) => {
    const valA = a[columnaOrden];
    const valB = b[columnaOrden];
    if (typeof valA === "string") {
      return ordenAscendente ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return ordenAscendente ? valA - valB : valB - valA;
  });

  // 🧮 Calcular paginación
  const totalPaginas = Math.ceil(categoriasOrdenadas.length / elementosPorPagina);
  const indiceInicial = (paginaActual - 1) * elementosPorPagina;
  const categoriasPaginadas = categoriasOrdenadas.slice(indiceInicial, indiceInicial + elementosPorPagina);

  const cambiarOrden = (columna) => {
    if (columna === columnaOrden) {
      setOrdenAscendente(!ordenAscendente);
    } else {
      setColumnaOrden(columna);
      setOrdenAscendente(true);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">Historial de Categorías</h3>
        <Link to="/categorias/agregar" className="btn btn-success">
          + Nueva Categoría
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th onClick={() => cambiarOrden("id")} style={{ cursor: "pointer" }}>
                ID {columnaOrden === "id" ? (ordenAscendente ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => cambiarOrden("nombre")} style={{ cursor: "pointer" }}>
                Nombre {columnaOrden === "nombre" ? (ordenAscendente ? "↑" : "↓") : ""}
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categoriasPaginadas.map((cat) => (
              <CategoriaFila
                key={cat.id}
                categoria={cat}
                onEliminar={eliminarCategoriaPorId}
                onEditar={abrirModalEditar}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔁 Controles de paginación */}
      <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
        >
          ← Anterior
        </button>

        <span>
          Página {paginaActual} de {totalPaginas}
        </span>

        <button
          className="btn btn-outline-primary"
          onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente →
        </button>
      </div>

      <ModalEditarCategoria
        show={mostrarModal}
        onHide={cerrarModal}
        categoriaId={categoriaIdEditar}
        onCategoriaActualizada={() => window.location.reload()}
      />
    </div>
  );
};
