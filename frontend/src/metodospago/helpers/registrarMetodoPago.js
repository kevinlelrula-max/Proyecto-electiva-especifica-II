export const registrarMetodoPago = async (nombre) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/metodos-pago`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre }),
    });

    return await res.json();
  } catch (error) {
    console.error('Error al registrar método de pago', error);
  }
};
