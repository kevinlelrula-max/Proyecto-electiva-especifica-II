// src/pages/Registro.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [datos, setDatos] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrar({ ...datos, rol: "cliente" }); // Se mantiene el rol cliente
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Registro de Usuario</h3>
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
          <button className="btn btn-success w-100" type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
