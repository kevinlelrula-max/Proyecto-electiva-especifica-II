// src/auth/components/LoginForm.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [datos, setDatos] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
   
  
  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(datos);
      const rol = response?.rol;

      if (!rol) {
        setError("No se pudo determinar el rol del usuario");
        return;
      }

      if (rol === "Administrador") navigate("/inventario");
else navigate("/punto-de-venta");
    } catch (err) {
      setError("Credenciales incorrectas o error de servidor");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Iniciar Sesión</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={datos.email}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={datos.password}
            onChange={handleChange}
            required
          />
          <button className="btn btn-primary w-100" type="submit">
            Iniciar Sesión
          </button>
        </form>
        <p className="text-center mt-3">
          ¿No tienes una cuenta? <a href="/registro">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
