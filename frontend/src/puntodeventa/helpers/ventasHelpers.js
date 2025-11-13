export function calcularTotalesVenta(carrito) {
  if (!Array.isArray(carrito) || carrito.length === 0) {
    return { subtotal: "0.00", iva: "0.00", total: "0.00" };
  }

  let subtotal = carrito.reduce((acum, item) => {
    if (!item) return acum;

    // Intentamos obtener un precio
    const precio =
      Number(item.precio) ||
      Number(item.precio_unitario) ||
      Number(item.precioUnitario) ||
      Number(item.PrecioUnitario) ||
      0;

    // Intentamos obtener kilos / cantidad
    const kilos =
      Number(item.kilos) ||
      Number(item.cantidad) ||
      Number(item.cantidad_kg) ||
      Number(item.cantidadKg) ||
      Number(item.CantidadKg) ||
      0;

    // Si tengo precio y kilos, uso precio * kilos
    if (precio > 0 && kilos > 0) {
      return acum + precio * kilos;
    }

    // Si no, intento usar un subtotal ya calculado en el item
    const subtotalItem =
      Number(item.subtotal) ||
      Number(item.total_parcial) ||
      Number(item.totalParcial) ||
      Number(item.TotalParcial) ||
      0;

    return acum + subtotalItem;
  }, 0);

  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  return {
    subtotal: subtotal.toFixed(2),
    iva: iva.toFixed(2),
    total: total.toFixed(2),
  };
}
