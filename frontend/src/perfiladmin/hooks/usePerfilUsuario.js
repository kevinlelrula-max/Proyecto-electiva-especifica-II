import { useState, useEffect } from "react";

export const usePerfilUsuario = (usuario) => {
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    tipo_documento: "Cédula de ciudadanía",
    numero_documento: "",
    id_municipio: "",
    id_departamento: ""
  });

  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    const cargarDepartamentos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ubicacion/departamentos`);
        const data = await res.json();
        setDepartamentos(data);
      } catch (error) {
        console.error("Error al cargar departamentos:", error);
      }
    };

    const cargarPerfil = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/personas/${usuario.email}`);
        const data = await res.json();
        setDatos(prev => ({ ...prev, ...data }));

        if (data.id_municipio) {
          const depRes = await fetch(`${import.meta.env.VITE_API_URL}/api/ubicacion/municipio/${data.id_municipio}`);
          const depData = await depRes.json();
          const id_departamento = depData.id_departamento;

          const resMun = await fetch(`${import.meta.env.VITE_API_URL}/api/ubicacion/municipios/${id_departamento}`);
          const munis = await resMun.json();

          setMunicipios(munis);
          setDatos(prev => ({ ...prev, id_departamento }));
        }
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      }
    };

    if (usuario?.email) {
      cargarDepartamentos().then(() => cargarPerfil());
    }
  }, [usuario]);

  useEffect(() => {
    const cargarMunicipios = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ubicacion/municipios/${datos.id_departamento}`);
        const data = await res.json();
        setMunicipios(data);
      } catch (error) {
        setMunicipios([]);
      }
    };

    if (datos.id_departamento) {
      cargarMunicipios();
    }
  }, [datos.id_departamento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({
      ...prev,
      [name]: value,
      ...(name === "id_departamento" ? { id_municipio: "" } : {})
    }));
  };

  return { datos, setDatos, departamentos, municipios, handleChange };
};
