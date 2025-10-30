export const eliminarMetodoPago = async (id) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/metodos-pago/${id}`, {
      method: 'DELETE',
    });

    return await res.json();
  } catch (error) {
    console.error('Error al eliminar método de pago', error);
  }
};
