export function calcularTotalesVenta(carrito) {
  let subtotal = 0;

  if (!Array.isArray(carrito)) {
    return {
      subtotal: '0.00',
      iva: '0.00',
      total: '0.00',
    };
  }

  carrito.forEach(item => {
    subtotal += (item.precio || 0) * (item.kilos || 0);
  });

  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  return {
    subtotal: subtotal.toFixed(2),
    iva: iva.toFixed(2),
    total: total.toFixed(2),
  };
}
