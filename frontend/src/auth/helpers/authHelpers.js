
export const campoVacio = (valor) => {
  return !valor || valor.trim() === "";
};

export const esEmailValido = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarRegistro = (datos) => {
  const errores = [];

  if (campoVacio(datos.nombre)) errores.push("El nombre es requerido.");
  if (campoVacio(datos.apellido)) errores.push("El apellido es requerido.");
  if (campoVacio(datos.usuario)) errores.push("El nombre de usuario es requerido.");
  if (campoVacio(datos.correo_electronico)) errores.push("El correo electrónico es requerido.");
  else if (!esEmailValido(datos.correo_electronico)) errores.push("El correo electrónico no es válido.");
  if (campoVacio(datos.contrasena)) errores.push("La contraseña es requerida.");
  if (campoVacio(datos.numero_documento)) errores.push("El número de documento es requerido.");
  if (campoVacio(datos.tipo_doc)) errores.push("Debe seleccionar un tipo de documento.");
  if (!datos.id_departamento) errores.push("Debe seleccionar un departamento.");
  if (!datos.id_municipio) errores.push("Debe seleccionar un municipio.");

  return errores;
};
