import { useState, useEffect } from "react";
import { useAuth } from "../../auth/context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validarRegistro } from "../helpers";
 
const RegistroForm = () => {
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    numero_documento: "",
    correo_electronico: "",
    usuario: "",
    contrasena: "",
    telefono: "",
    tipo_doc: "",
    id_departamento: "",
    id_municipio: "",
  });

  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const tiposDocumento = ["Cédula de ciudadanía", "Cédula de extranjería", "Pasaporte"];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/ubicacion/departamentos`)
      .then(res => res.json())
      .then(data => setDepartamentos(data))
      .catch(err => console.error("Error al cargar departamentos:", err));
  }, []);

  useEffect(() => {
    const id = parseInt(datos.id_departamento);
    if (!isNaN(id)) {
      fetch(`${import.meta.env.VITE_API_URL}/api/ubicacion/municipios/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Error al obtener municipios");
          return res.json();
        })
        .then(data => setMunicipios(data))
        .catch(err => {
          console.error("Error al cargar municipios:", err);
          setMunicipios([]);
        });
    } else {
      setMunicipios([]);
    }
  }, [datos.id_departamento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({
      ...prev,
      [name]: value,
      ...(name === "correo_electronico" && { usuario: value }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errores = validarRegistro(datos);
    if (errores.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Errores en el formulario",
        html: errores.join("<br>"),
      });
      return;
    }

    try {
      await registrar(datos);
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Tu cuenta ha sido creada.",
      }).then(() => navigate("/login"));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error de registro",
        text: err.message || "Ocurrió un error inesperado",
      });
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: "500px" }}>
        <h3 className="text-center mb-3">Registro</h3>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" name="nombre" placeholder="Nombre" onChange={handleChange} />
          <input className="form-control mb-2" name="apellido" placeholder="Apellido" onChange={handleChange} />
          <input className="form-control mb-2" name="direccion" placeholder="Dirección" onChange={handleChange} />
          <input className="form-control mb-2" name="numero_documento" placeholder="Número de Documento" onChange={handleChange} />
          <input className="form-control mb-2" name="correo_electronico" type="email" placeholder="Correo electrónico" onChange={handleChange} />
          <input className="form-control mb-2" name="contrasena" type="password" placeholder="Contraseña" onChange={handleChange} />
          <input className="form-control mb-2" name="telefono" placeholder="Teléfono" onChange={handleChange} />

          <select className="form-control mb-2" name="tipo_doc" onChange={handleChange}>
            <option value="">Seleccione tipo de documento</option>
            {tiposDocumento.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>

          <select className="form-control mb-2" name="id_departamento" onChange={handleChange}>
            <option value="">Seleccione un departamento</option>
            {Array.isArray(departamentos) && departamentos.map(dep => (
              <option key={dep.id} value={dep.id}>{dep.nombre}</option>
            ))}
          </select>

          <select className="form-control mb-3" name="id_municipio" onChange={handleChange}>
            <option value="">Seleccione un municipio</option>
            {Array.isArray(municipios) && municipios.map(m => (
              <option key={m.municipio_id} value={m.municipio_id}>{m.nombre}</option>
            ))}
          </select>

          <button className="btn btn-success w-100" type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default RegistroForm;
