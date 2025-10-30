import { useEffect, useState } from "react";

export const useVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const obtenerVentas = async () => {
    try {
      setCargando(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ventas/detalle/general`); // ✅ Cambiado
      if (!res.ok) throw new Error("Error al obtener ventas detalladas");
      const data = await res.json();
      setVentas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Error al cargar las ventas:", err);
      setError("No se pudieron cargar las ventas");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerVentas();
  }, []);

  return { ventas, cargando, error, recargarVentas: obtenerVentas };
};
