import React, { useContext, useState } from "react";
import { ProductosContext } from "../context/ProductosContext";
import { InventarioHeader, InventarioSearchBar, InventoryTable } from "../components";

export const InventarioPage = () => {
  const { productos, eliminarProducto } = useContext(ProductosContext);
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = Array.isArray(productos)
  ? productos.filter(
      (p) =>
        p &&
        typeof p.nombre === "string" &&
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
  : [];

  return (
    <div className="container my-1">
      <div className="bg-white shadow-lg rounded p-4">
        <InventarioHeader total={productosFiltrados.length} />
        <InventarioSearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
        <InventoryTable productos={productosFiltrados} eliminarProducto={eliminarProducto} />
      </div>
    </div>
  );
};
