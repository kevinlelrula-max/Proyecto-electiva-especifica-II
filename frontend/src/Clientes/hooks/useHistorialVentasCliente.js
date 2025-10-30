import { useEffect, useState } from "react";
import { useAuth } from "../../auth/context";

export const useHistorialVentasCliente = () => {
  const { usuario } = useAuth();
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ventas/cliente/${usuario.id}/detalle`);
        const data = await res.json();
        setVentas(data);
      } catch (error) {
        console.error("Error al cargar ventas:", error);
      }
    };

    if (usuario?.id) obtenerVentas();
  }, [usuario]);

  return ventas;
};
