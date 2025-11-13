export function calcularTotalesVenta(carrito) {
  if (!Array.isArray(carrito) || carrito.length === 0) {
    return { subtotal: "0.00", iva: "0.00", total: "0.00" };
  }

  let subtotal = 0;

  carrito.forEach(item => {
    // Convertir precio (viene como string)
    let precio = String(item.precio || item.precio_unitario || "")
      .replace(",", ".")          // si viene "16500,00"
      .replace(/\s+/g, "");       // limpiar espacios
    precio = parseFloat(precio) || 0;

    // Convertir kilos
    let kilos = String(item.kilos || item.cantidad || item.cantidad_kg || "")
      .replace(",", ".")
      .replace(/\s+/g, "");
    kilos = parseFloat(kilos) || 0;

    // Si existe subtotal interno, úsalo
    const sub = parseFloat(item.subtotal) || (precio * kilos);

    subtotal += sub;
  });

  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  return {
    subtotal: subtotal.toFixed(2),
    iva: iva.toFixed(2),
    total: total.toFixed(2),
  };
}
