import { useState, useEffect, useContext } from "react";
import { ProductosContext } from "../../inventario/context";

export const usePuntoDeVenta = () => {
  const { productos } = useContext(ProductosContext);
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [kilos, setKilos] = useState(1);
  const [metodoPago, setMetodoPago] = useState("1");
  const [metodosPago, setMetodosPago] = useState([]);

  // 🔽 Cargar métodos de pago desde el backend
  useEffect(() => {
    const cargarMetodos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/metodos-pago`);
        const data = await res.json();
        setMetodosPago(data);
      } catch (error) {
        console.error("❌ Error al cargar métodos de pago:", error);
      }
    };
    cargarMetodos();
  }, []);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarAlCarrito = () => {
    if (!productoSeleccionado || kilos <= 0) return;

    // ✅ Validar stock disponible
    if (kilos > productoSeleccionado.kilos) {
      alert(`Solo hay ${productoSeleccionado.kilos} kg disponibles.`);
      return;
    }

    const subtotal = parseFloat(productoSeleccionado.precio) * kilos;

    setCarrito((prev) => [
      ...prev,
      {
        producto_id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        kilos,
        subtotal,
      },
    ]);

    setProductoSeleccionado(null);
    setKilos(1);
    setBusqueda("");
  };

  const eliminarDelCarrito = (index) => {
    setCarrito(carrito.filter((_, i) => i !== index));
  };

  const calcularTotal = () =>
    carrito.reduce((acc, item) => acc + item.subtotal, 0);

  return {
    productosFiltrados,
    busqueda,
    setBusqueda,
    carrito,
    setCarrito,
    productoSeleccionado,
    setProductoSeleccionado,
    kilos,
    setKilos,
    metodoPago,
    setMetodoPago,
    metodosPago,
    agregarAlCarrito,
    eliminarDelCarrito,
    calcularTotal,
  };
};
