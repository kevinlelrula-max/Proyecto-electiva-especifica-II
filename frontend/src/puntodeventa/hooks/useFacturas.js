import { useEffect, useState } from "react";

export const useFacturas = (usuarioId) => {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    const cargarFacturas = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ventas/facturas/cliente/${usuarioId}`);
        if (!response.ok) throw new Error("Error en la respuesta del servidor");

        const data = await response.json();
        setFacturas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar facturas:", error);
        setFacturas([]);
      }
    };

    if (usuarioId) cargarFacturas();
  }, [usuarioId]);

  return facturas;
};
