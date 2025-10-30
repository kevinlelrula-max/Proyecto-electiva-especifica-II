export const obtenerMetodosPago = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/metodos-pago`);


    if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
      throw new Error('Respuesta no válida o no es JSON');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener métodos de pago:', error);
    return [];
  }
};
