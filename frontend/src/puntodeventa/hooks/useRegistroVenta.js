import { useState } from "react";

export const useRegistroVenta = (productos, registrarVenta, usuario, toast) => {
  const [venta, setVenta] = useState({
    email: "",
    producto: "",
    cantidad: 1,
    metodo_pago_id: "1", // Efectivo por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenta((prev) => ({ ...prev, [name]: value }));
  };

  const resetFormulario = () => {
    setVenta({
      email: "",
      producto: "",
      cantidad: 1,
      metodo_pago_id: "1",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productoSeleccionado = productos.find(p => p.nombre === venta.producto);
    if (!productoSeleccionado) {
      toast.error("Producto no encontrado");
      return;
    }

    if (venta.cantidad > productoSeleccionado.kilos) {
      toast.error(`Solo hay ${productoSeleccionado.kilos} kg disponibles.`);
      return;
    }

    try {
      const resCliente = await fetch(`${import.meta.env.VITE_API_URL}/api/clientes/${venta.email}`);
      if (!resCliente.ok) throw new Error("Cliente no encontrado");
      const cliente = await resCliente.json();

      const ventaData = {
        cliente_id: cliente.id,
        administrador_id: usuario.id,
        metodo_pago_id: parseInt(venta.metodo_pago_id),
        productos: [{
          producto_id: productoSeleccionado.id,
          kilos: parseFloat(venta.cantidad),
          precio_unitario: parseFloat(productoSeleccionado.precio)
        }]
      };

      await registrarVenta(ventaData);
      toast.success("Venta registrada correctamente");
      resetFormulario();
    } catch (err) {
      console.error("❌ Error al enviar venta:", err);
      toast.error("Error al registrar la venta");
    }
  };

  return {
    venta,
    handleChange,
    handleSubmit
  };
};
