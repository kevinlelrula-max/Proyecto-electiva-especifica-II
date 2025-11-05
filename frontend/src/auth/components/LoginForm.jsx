// src/auth/components/LoginForm.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [datos, setDatos] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const resp = await login(datos);
      const rol = resp?.rol;
      if (!rol) return setError("No se pudo determinar el rol del usuario");
      if (rol === "Administrador") navigate("/inventario");
      else navigate("/punto-de-venta");
    } catch {
      setError("Credenciales incorrectas o error de servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column flex-lg-row w-100" style={{ minHeight: "100vh" }}>
      {/* Panel izquierdo */}
      <div
        className="d-flex flex-column justify-content-center align-items-start px-5 py-4 flex-fill"
        style={{
          background:
            "linear-gradient(160deg, #022b43 0%, #084f7c 60%, #0a6ba6 100%)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Pez decorativo SVG */}
        <div style={{ position: "absolute", top: "15%", right: "5%", opacity: 0.05 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="300"
            height="300"
            fill="#fff"
          >
            <path d="M32 2C15 2 2 15 2 32s13 30 30 30 30-13 30-30S49 2 32 2zm0 54C18 56 8 46 8 32S18 8 32 8s24 10 24 24-10 24-24 24z" />
            <circle cx="42" cy="27" r="3" />
            <path d="M18 30c8-6 14-9 22-7-2 4-2 10 0 14-8 2-14-1-22-7z" />
          </svg>
        </div>

        <h1 className="fw-bold mb-3" style={{ fontSize: "2.8rem", zIndex: 2 }}>
          Fishware
        </h1>
        <p className="lead mb-4" style={{ maxWidth: "440px", opacity: 0.95, zIndex: 2 }}>
          El sistema inteligente de gestión para el sector pesquero. Controla tus
          ventas, inventario y clientes desde una sola plataforma.
        </p>
      </div>

      {/* Panel derecho */}
      <div
        className="d-flex flex-column justify-content-center align-items-center flex-fill"
        style={{
          background: "#f3f6fb",
          padding: "3rem 1rem",
        }}
      >
        <div
          className="card shadow-lg border-0 rounded-4 w-100"
          style={{
            maxWidth: "420px",
            background: "#fff",
            padding: "2.5rem 2rem",
          }}
        >
          <div className="card-body">
            <h3
              className="text-center mb-4 fw-semibold"
              style={{ color: "#04345c", fontSize: "1.6rem" }}
            >
              Iniciar Sesión
            </h3>

            {error && <div className="alert alert-danger py-2 mb-3">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="correo@empresa.com"
                  value={datos.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Correo electrónico</label>
              </div>

              <div className="input-group mb-4">
                <div className="form-floating flex-grow-1">
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Contraseña"
                    value={datos.password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="password">Contraseña</label>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPass((s) => !s)}
                >
                  {showPass ? "Ocultar" : "Ver"}
                </button>
              </div>

              <button
                className="btn w-100 py-2 fw-semibold"
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: "#0a5b9f",
                  color: "#fff",
                  borderRadius: "10px",
                  border: "none",
                  fontSize: "1rem",
                  boxShadow: "0 3px 6px rgba(10,91,159,0.3)",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0b6ec5")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0a5b9f")}
              >
                {loading ? "Ingresando…" : "Iniciar Sesión"}
              </button>
            </form>

            <p className="text-center mt-3 mb-0">
              ¿No tienes una cuenta?{" "}
              <a href="/registro" className="link-primary">
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>

        <div className="mt-4 text-muted" style={{ fontSize: ".9rem" }}>
          © {new Date().getFullYear()} Fishware —{" "}
          <a href="#" className="link-secondary">
            Privacidad
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
