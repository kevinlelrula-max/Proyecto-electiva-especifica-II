export function calcularTotalesVenta(carrito) {
  if (!Array.isArray(carrito)) {
    return { subtotal: "0.00", iva: "0.00", total: "0.00" };
  }

  let subtotal = carrito.reduce((acum, item) => {
    const precio = Number(item.precio) || 0;  
    const kilos  = Number(item.kilos)  || 0;   
    return acum + precio * kilos;
  }, 0);

  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  return {
    subtotal: subtotal.toFixed(2),
    iva: iva.toFixed(2),
    total: total.toFixed(2),
  };
}
