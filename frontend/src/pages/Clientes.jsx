import React, { useEffect, useState } from "react";


const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clientes`);
        const data = await res.json();
        setClientes(data);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };

    obtenerClientes();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Clientes Registrados</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Correo</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Fecha de Registro</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr><td colSpan="6" className="text-center">No hay clientes registrados</td></tr>
            ) : (
              clientes.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.email}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.apellido}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.direccion}</td>
                  <td>{new Date(cliente.fecha_registro).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
