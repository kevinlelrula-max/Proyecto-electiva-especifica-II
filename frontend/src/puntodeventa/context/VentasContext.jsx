// src/modules/ventas/context/VentasContext.jsx
import { createContext, useState, useContext } from "react";
import { ProductosContext } from "../../inventario/context";

export const VentasContext = createContext();

export const VentasProvider = ({ children }) => {
  const [ventas, setVentas] = useState([]);
  const [ventasDetalle, setVentasDetalle] = useState([]);

  const { cargarProductos } = useContext(ProductosContext); // ✅ importante para actualizar stock

  const registrarVenta = async (venta) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ventas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(venta),
      });

      if (!res.ok) throw new Error("Error al registrar la venta");

      const result = await res.json();
      console.log("✔ Venta registrada:", result);

      // ✅ Recargar productos desde la BD para ver el nuevo stock actualizado
      await cargarProductos();

      // ✅ Actualizar ventas locales (opcional)
      setVentas((prev) => [...prev, result]);
    } catch (error) {
      console.error("❌ Error registrando venta:", error);
    }
  };

  const cargarTodasVentas = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ventas`);
      const data = await res.json();
      setVentas(data);
    } catch (error) {
      console.error("Error cargando todas las ventas:", error);
    }
  };

  const cargarVentasCliente = async (usuarioId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ventas/cliente/${usuarioId}`);
      const data = await res.json();
      setVentas(data);
    } catch (error) {
      console.error("Error cargando ventas del cliente:", error);
    }
  };

const cargarVentasDetalle = async () => {
  try {
    console.log("🚀 Ejecutando fetch desde cargarVentasDetalle...");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ventas/graficas/detalle-ventas`);
    const data = await res.json();
    console.log("📥 Datos recibidos en cargarVentasDetalle:", data);
    setVentasDetalle(data);
  } catch (error) {
    console.error("❌ Error cargando detalle de ventas para gráficas:", error);
  }
};

  return (
    <VentasContext.Provider
      value={{
        ventas,
        ventasDetalle,
        registrarVenta,
        cargarTodasVentas,
        cargarVentasCliente,
        cargarVentasDetalle,
      }}
    >
      {children}
    </VentasContext.Provider>
  );
};
