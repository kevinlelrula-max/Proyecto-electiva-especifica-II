import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const PerfilCliente = () => {
  const { usuario } = useAuth();
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    tipo_documento_id: 2,
    numero_documento: "",
    id_municipio: "",
    id_departamento: ""
  });

  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clientes/${usuario.email}`);
        const data = await res.json();
        setDatos({
          nombre: data.nombre || "",
          apellido: data.apellido || "",
          telefono: data.telefono || "",
          direccion: data.direccion || "",
          tipo_documento_id: data.tipo_documento_id || 2,
          numero_documento: data.numero_documento || "",
          id_municipio: data.id_municipio || "",
          id_departamento: data.id_departamento || ""
        });
      } catch (error) {
        console.error("Error al cargar el perfil del cliente:", error);
      }
    };

    const cargarUbicaciones = async () => {
      try {
        const resDep = await fetch(`${import.meta.env.VITE_API_URL}/api/ubicacion/departamentos`);
        const dataDep = await resDep.json();
        setDepartamentos(dataDep);
      } catch (error) {
        console.error("Error al cargar departamentos:", error);
      }
    };

    if (usuario?.email) {
      cargarPerfil();
      cargarUbicaciones();
    }
  }, [usuario]);

  useEffect(() => {
    const cargarMunicipios = async () => {
      if (!datos.id_departamento) return;
      try {
        const resMun = await fetch(`${import.meta.env.VITE_API_URL}/api/ubicacion/municipios/${datos.id_departamento}`);
        const dataMun = await resMun.json();
        if (Array.isArray(dataMun)) {
          setMunicipios(dataMun);
        } else {
          setMunicipios([]);
        }
      } catch (error) {
        console.error("Error al cargar municipios:", error);
        setMunicipios([]);
      }
    };
    cargarMunicipios();
  }, [datos.id_departamento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "id_departamento") {
      setDatos({ ...datos, id_departamento: value, id_municipio: "" });
    } else {
      setDatos({ ...datos, [name]: value });
    }
  };

  const handleGuardar = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clientes/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, email: usuario.email }),
      });

      const resultado = await res.json();
      if (!res.ok) throw new Error(resultado.mensaje);

      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al guardar el perfil del cliente:", error);
      alert("Error al guardar el perfil");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow w-50 mx-auto">
        <h3 className="text-center mb-4">Perfil del Cliente</h3>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input type="email" value={usuario?.email || ""} className="form-control" disabled />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo de documento</label>
          <select
            name="tipo_documento_id"
            value={datos.tipo_documento_id}
            onChange={handleChange}
            className="form-control"
          >
            <option value="1">Tarjeta de identidad</option>
            <option value="2">Cédula de ciudadanía</option>
            <option value="3">Cédula de extranjería</option>
            <option value="4">Pasaporte</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Número de documento</label>
          <input
            type="text"
            name="numero_documento"
            value={datos.numero_documento}
            onChange={handleChange}
            className="form-control"
            placeholder="Ej: 1023456789"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={datos.nombre}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingresa tu nombre"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            name="apellido"
            value={datos.apellido}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingresa tu apellido"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={datos.telefono}
            onChange={handleChange}
            className="form-control"
            placeholder="Ej: 3001234567"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={datos.direccion}
            onChange={handleChange}
            className="form-control"
            placeholder="Ej: Calle 123 #45-67"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Departamento</label>
          <select
            className="form-select"
            name="id_departamento"
            value={datos.id_departamento}
            onChange={handleChange}
          >
            <option value="">Seleccione un departamento</option>
            {departamentos.map((d) => (
              <option key={d.id} value={d.id}>{d.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Municipio</label>
          <select
            className="form-select"
            name="id_municipio"
            value={datos.id_municipio}
            onChange={handleChange}
            disabled={!datos.id_departamento}
          >
            <option value="">Seleccione un municipio</option>
            {municipios.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary w-100" onClick={handleGuardar}>
          Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default PerfilCliente;
