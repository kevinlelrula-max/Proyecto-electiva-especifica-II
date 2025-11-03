// src/inventario/helpers/formatos.js
export const formatearPrecio = (valor) => {
    return `$${Number(valor).toFixed(2)}`;
  };
  
  export const formatearKilos = (kilos) => {
    return `${kilos} kg`;
  };
  