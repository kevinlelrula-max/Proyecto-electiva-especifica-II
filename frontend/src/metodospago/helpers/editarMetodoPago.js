export const editarMetodoPago = async (id, nombre) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/metodos-pago/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre }),
    });

    return await res.json();
  } catch (error) {
    console.error('Error al editar método de pago', error);
  }
};
