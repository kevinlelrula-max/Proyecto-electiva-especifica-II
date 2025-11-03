import React, { useState } from 'react';
import MetodoPagoForm from '../components/MetodoPagoForm';
import MetodoPagoFila from '../components/MetodoPagoFila';
import EditarMetodoPagoModal from '../components/EditarMetodoPagoModal';
import { useMetodosPago } from '../hooks/useMetodosPago';
import { registrarMetodoPago } from '../helpers/registrarMetodoPago';
import { editarMetodoPago } from '../helpers/editarMetodoPago';
import { eliminarMetodoPago } from '../helpers/eliminarMetodoPago';
import Swal from 'sweetalert2';
import '../styles/HistorialMetodoPago.css';

const HistorialMetodoPago = () => {
  const { metodos, cargarMetodos } = useMetodosPago();
  const [nombre, setNombre] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idActual, setIdActual] = useState(null);

  // Modal de edición
  const [mostrarModal, setMostrarModal] = useState(false);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);
  const [nuevoNombreMetodo, setNuevoNombreMetodo] = useState('');

  // 🔢 Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  // ↕️ Ordenación
  const [columnaOrden, setColumnaOrden] = useState('id');
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    if (modoEdicion) {
      await editarMetodoPago(idActual, nombre);
      Swal.fire('Actualizado', 'Método de pago actualizado', 'success');
    } else {
      await registrarMetodoPago(nombre);
      Swal.fire('Registrado', 'Método de pago registrado', 'success');
    }
    setNombre('');
    setModoEdicion(false);
    cargarMetodos();
  };

  const handleEditar = (metodo) => {
    setMetodoSeleccionado(metodo);
    setNuevoNombreMetodo(metodo.metodo);
    setMostrarModal(true); // Mostrar modal
  };

  const guardarEdicion = async () => {
    await editarMetodoPago(metodoSeleccionado.id, nuevoNombreMetodo);
    Swal.fire("Actualizado", "Método de pago actualizado", "success");
    setMetodoSeleccionado(null);
    setNuevoNombreMetodo('');
    setMostrarModal(false); // Cierra el modal al guardar
    cargarMetodos();
  };

  const handleEliminar = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    });
    if (confirm.isConfirmed) {
      await eliminarMetodoPago(id);
      Swal.fire('Eliminado', 'Método de pago eliminado', 'success');
      cargarMetodos();
    }
  };

  const cambiarOrden = (columna) => {
    if (columna === columnaOrden) {
      setOrdenAscendente(!ordenAscendente);
    } else {
      setColumnaOrden(columna);
      setOrdenAscendente(true);
    }
  };

  const metodosOrdenados = [...metodos].sort((a, b) => {
    const valA = a[columnaOrden];
    const valB = b[columnaOrden];
    if (typeof valA === 'string') {
      return ordenAscendente
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
    return ordenAscendente ? valA - valB : valB - valA;
  });

  const totalPaginas = Math.ceil(metodosOrdenados.length / elementosPorPagina);
  const indiceInicial = (paginaActual - 1) * elementosPorPagina;
  const metodosPaginados = metodosOrdenados.slice(
    indiceInicial,
    indiceInicial + elementosPorPagina
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Historial de Métodos de Pago</h2>

      <MetodoPagoForm nombre={nombre} setNombre={setNombre} handleSubmit={handleSubmit} />

      <table className="tabla-metodos mt-4">
        <thead>
          <tr>
            <th onClick={() => cambiarOrden('id')} style={{ cursor: 'pointer' }}>
              ID {columnaOrden === 'id' ? (ordenAscendente ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => cambiarOrden('metodo')} style={{ cursor: 'pointer' }}>
              Nombre {columnaOrden === 'metodo' ? (ordenAscendente ? '↑' : '↓') : ''}
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {metodosPaginados.map((metodo) => (
            <MetodoPagoFila
              key={metodo.id}
              metodo={{
                id_metodo: metodo.id,
                nombre_metodo: metodo.metodo,
              }}
              onEditar={() => handleEditar(metodo)}
              onEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
        >
          ← Anterior
        </button>
        <span className="align-self-center">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          className="btn btn-outline-primary ms-2"
          onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente →
        </button>
      </div>

      {}
      {mostrarModal && (
        <EditarMetodoPagoModal
          metodo={metodoSeleccionado}
          nuevoNombre={nuevoNombreMetodo}
          setNuevoNombre={setNuevoNombreMetodo}
          onGuardar={guardarEdicion}
          onClose={() => setMostrarModal(false)} 
        />
      )}
    </div>
  );
};

export default HistorialMetodoPago;
