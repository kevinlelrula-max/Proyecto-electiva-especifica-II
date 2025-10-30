// src/Clientes/hooks/useClientes.js
import { useEffect, useState } from "react";
import { filtrarClientes } from "../helpers"; 

export const useClientes = () => {
  const [personas, setPersonas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const obtenerPersonas = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/personas`);
        const data = await res.json();
        setPersonas(data);
      } catch (error) {
        console.error("Error al cargar las personas:", error);
      }
    };
    obtenerPersonas();
  }, []);

  const clientesFiltrados = filtrarClientes(personas, busqueda);

  return { clientesFiltrados, busqueda, setBusqueda };
};
