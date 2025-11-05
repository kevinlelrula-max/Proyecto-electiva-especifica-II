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

  const [touched, setTouched] = useState({});
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [loadingDeps, setLoadingDeps] = useState(false);
  const [loadingMuns, setLoadingMuns] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const tiposDocumento = ["Cédula de ciudadanía", "Cédula de extranjería", "Pasaporte"];

  useEffect(() => {
    setLoadingDeps(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/ubicacion/departamentos`)
      .then(res => res.json())
      .then(data => setDepartamentos(Array.isArray(data) ? data : []))
      .catch(() => setDepartamentos([]))
      .finally(() => setLoadingDeps(false));
  }, []);

  useEffect(() => {
    const id = parseInt(datos.id_departamento);
    if (!isNaN(id)) {
      setLoadingMuns(true);
      fetch(`${import.meta.env.VITE_API_URL}/api/ubicacion/municipios/${id}`)
        .then(res => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then(data => setMunicipios(Array.isArray(data) ? data : []))
        .catch(() => setMunicipios([]))
        .finally(() => setLoadingMuns(false));
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
      ...(name === "id_departamento" && { id_municipio: "" }),
    }));
  };

  const handleBlur = (e) => setTouched(prev => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errores = validarRegistro(datos);
    if (errores.length > 0) {
      Swal.fire({ icon: "error", title: "Errores en el formulario", html: errores.join("<br>") });
      return;
    }
    try {
      setSubmitting(true);
      await registrar(datos);
      Swal.fire({ icon: "success", title: "Registro exitoso", text: "Tu cuenta ha sido creada." })
        .then(() => navigate("/login"));
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error de registro", text: err.message || "Ocurrió un error inesperado" });
    } finally {
      setSubmitting(false);
    }
  };

  const invalid = (name) => touched[name] && !String(datos[name] || "").trim();

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        background:
          "radial-gradient(1200px 600px at 15% -10%, rgba(28,78,137,.12), transparent 60%), radial-gradient(1000px 500px at 110% 110%, rgba(16,58,100,.14), transparent 60%), linear-gradient(180deg,#f3f6fb,#eaf0f7)",
      }}
    >
      <div className="w-100 d-flex justify-content-center px-3">
        <div
          className="card border-0 w-100"
          style={{
            maxWidth: 700,
            borderRadius: "18px",
            background: "#ffffff",
            boxShadow:
              "0 24px 50px rgba(0,0,0,.12), 0 4px 12px rgba(0,0,0,.06)",
          }}
        >
          <div className="p-4 p-md-5 text-center">
            {/* 🔹 Logo o ícono opcional */}
            <div className="mb-3">
              <img
                src="/fish-logo.svg"
                alt="Fishware"
                width="52"
                height="52"
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
                }}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>

            <h3 className="fw-semibold mb-2" style={{ color: "#0a2540" }}>
              Registro
            </h3>
            <p className="text-muted mb-4" style={{ marginTop: 0 }}>
              Crea tu cuenta para empezar a usar{" "}
              <span className="fw-semibold" style={{ color: "#0a2540" }}>
                Fishware
              </span>.
            </p>

            <form onSubmit={handleSubmit} noValidate className="text-start">
              <div className="row g-3">
                {/* Nombre / Apellido */}
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input
                      className={`form-control ${invalid("nombre") ? "is-invalid" : ""}`}
                      id="nombre"
                      name="nombre"
                      placeholder="Nombre"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="nombre">Nombre</label>
                    <div className="invalid-feedback">Ingresa tu nombre.</div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input
                      className={`form-control ${invalid("apellido") ? "is-invalid" : ""}`}
                      id="apellido"
                      name="apellido"
                      placeholder="Apellido"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="apellido">Apellido</label>
                    <div className="invalid-feedback">Ingresa tu apellido.</div>
                  </div>
                </div>

                {/* Dirección */}
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      className="form-control"
                      id="direccion"
                      name="direccion"
                      placeholder="Dirección"
                      onChange={handleChange}
                    />
                    <label htmlFor="direccion">Dirección</label>
                  </div>
                </div>

                {/* Documento / Tipo */}
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input
                      className={`form-control ${invalid("numero_documento") ? "is-invalid" : ""}`}
                      id="numero_documento"
                      name="numero_documento"
                      placeholder="Número de documento"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="numero_documento">Número de Documento</label>
                    <div className="invalid-feedback">Requerido.</div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <select
                      className={`form-select ${invalid("tipo_doc") ? "is-invalid" : ""}`}
                      id="tipo_doc"
                      name="tipo_doc"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Seleccione…
                      </option>
                      {tiposDocumento.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="tipo_doc">Tipo de documento</label>
                    <div className="invalid-feedback">Selecciona una opción.</div>
                  </div>
                </div>

                {/* Correo */}
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      className={`form-control ${
                        invalid("correo_electronico") ? "is-invalid" : ""
                      }`}
                      id="correo"
                      name="correo_electronico"
                      type="email"
                      placeholder="Correo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="correo">Correo electrónico</label>
                    <div className="invalid-feedback">Correo inválido.</div>
                  </div>
                  <small className="text-muted d-block mt-1">
                    Tu usuario se generará con el correo.
                  </small>
                </div>

                {/* Contraseña con ver/ocultar */}
                <div className="col-12">
                  <div className="form-floating position-relative">
                    <input
                      className={`form-control pe-5 ${
                        invalid("contrasena") ? "is-invalid" : ""
                      }`}
                      id="contrasena"
                      name="contrasena"
                      type={showPass ? "text" : "password"}
                      placeholder="Contraseña"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="contrasena">Contraseña</label>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2"
                      onClick={() => setShowPass((s) => !s)}
                    >
                      {showPass ? "Ocultar" : "Ver"}
                    </button>
                    <div className="invalid-feedback">Ingresa una contraseña.</div>
                  </div>
                </div>

                {/* Teléfono / Departamento */}
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input
                      className="form-control"
                      id="telefono"
                      name="telefono"
                      placeholder="Teléfono"
                      onChange={handleChange}
                    />
                    <label htmlFor="telefono">Teléfono</label>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="id_departamento"
                      name="id_departamento"
                      onChange={handleChange}
                      value={datos.id_departamento}
                    >
                      <option value="">
                        {loadingDeps ? "Cargando…" : "Seleccione…"}
                      </option>
                      {departamentos.map((dep) => (
                        <option key={dep.id} value={dep.id}>
                          {dep.nombre}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="id_departamento">Departamento</label>
                  </div>
                </div>

                {/* Municipio */}
                <div className="col-12">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="id_municipio"
                      name="id_municipio"
                      onChange={handleChange}
                      value={datos.id_municipio}
                      disabled={!datos.id_departamento || loadingMuns}
                      style={{
                        backgroundColor:
                          !datos.id_departamento || loadingMuns
                            ? "#eef2f7"
                            : "#fff",
                        color:
                          !datos.id_departamento || loadingMuns
                            ? "#6b7280"
                            : "inherit",
                      }}
                    >
                      <option value="">
                        {!datos.id_departamento
                          ? "Selecciona un departamento"
                          : loadingMuns
                          ? "Cargando…"
                          : "Seleccione…"}
                      </option>
                      {municipios.map((m) => (
                        <option key={m.municipio_id} value={m.municipio_id}>
                          {m.nombre}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="id_municipio">Municipio</label>
                  </div>
                </div>
              </div>

              {/* Botón principal */}
              <button
                className="btn w-100 mt-4 py-2 rounded-3 fw-semibold"
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: "#1c4e89",
                  color: "#fff",
                  border: "none",
                  boxShadow: "0 4px 10px rgba(28,78,137,.25)",
                  transition: "all 0.25s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2361ab")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1c4e89")
                }
              >
                {submitting ? "Creando cuenta…" : "Registrarse"}
              </button>

              {/* Enlace hacia Login */}
              <p className="text-center mt-3 mb-0">
                ¿Ya tienes una cuenta?{" "}
                <a
                  href="/login"
                  style={{
                    color: "#1c4e89",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  Inicia sesión
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroForm;
