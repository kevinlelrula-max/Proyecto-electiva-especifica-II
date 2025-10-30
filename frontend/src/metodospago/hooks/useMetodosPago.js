import { useState, useEffect } from 'react';
import { obtenerMetodosPago } from '../helpers/obtenerMetodosPago';

export const useMetodosPago = () => {
  const [metodos, setMetodos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarMetodos = async () => {
    setCargando(true);
    try {
      const data = await obtenerMetodosPago();
      setMetodos(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("❌ Error al cargar métodos de pago:", err);
      setError("No se pudieron cargar los métodos de pago.");
      setMetodos([]); // Limpia la lista si falla
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarMetodos();
  }, []);

  return { metodos, cargarMetodos, cargando, error };
};
