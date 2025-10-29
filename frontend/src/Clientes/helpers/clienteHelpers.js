// Clientes/helpers/clienteHelpers.js

// Capitaliza la primera letra
const capitalizar = (texto) =>
  texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

export const formatearNombreCompleto = (nombre, apellido) => {
  return `${capitalizar(nombre)} ${capitalizar(apellido)}`;
};

export const filtrarClientes = (clientes, termino) => {
  const texto = termino.toLowerCase();
  return clientes.filter((c) =>
    `${c.nombre} ${c.apellido} ${c.usuario || c.email || c.correo_electronico}`
      .toLowerCase()
      .includes(texto)
  );
};
