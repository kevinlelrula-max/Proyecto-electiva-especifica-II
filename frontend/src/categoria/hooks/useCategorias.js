import { useEffect, useState } from "react";
import { eliminarCategoria } from "../helpers/eliminarCategoria";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categorias`);
      const data = await res.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const agregarCategoria = async (nombre) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categorias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre }),
      });
      if (res.ok) await cargarCategorias();
    } catch (error) {
      console.error("Error al agregar categoría:", error);
    }
  };

  const eliminarCategoriaPorId = async (id) => {
    await eliminarCategoria(id);
    await cargarCategorias();
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return {
    categorias,
    agregarCategoria,
    eliminarCategoriaPorId,
  };
};
