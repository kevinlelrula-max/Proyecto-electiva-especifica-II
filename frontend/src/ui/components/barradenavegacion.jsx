import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context";
import {
  FaChartBar,
  FaUserFriends,
  FaBoxOpen,
  FaClipboardList,
  FaClipboardCheck,
  FaUserCircle,
  FaTags,
  FaCreditCard  // <- Icono para Métodos de Pago
} from "react-icons/fa";
import './Barradenavegacion.css';

const Barradenavegacion = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="modern-navbar">
      <div className="brand">🐟 Fishware</div>

      <ul className="nav-links">
        <li><Link to="/inventario"><FaBoxOpen /> Inventario</Link></li>
        <li><Link to="/productos"><FaClipboardList /> Productos</Link></li>
        <li><Link to="/categorias/historial"><FaTags /> Categorías</Link></li>
        <li><Link to="/metodospago/historial"><FaCreditCard /> Métodos de Pago</Link></li> {/* ✅ NUEVO */}
        <li><Link to="/historial-ventas"><FaClipboardCheck /> Ventas</Link></li>
        <li><Link to="/clientes"><FaUserFriends /> Clientes</Link></li>
        <li><Link to="/graficas"><FaChartBar /> Gráficas</Link></li>
        <li><Link to="/admin/facturas"><FaClipboardCheck /> Facturas</Link></li>
      </ul>

      <div className="dropdown">
        <button className="perfil-admin-btn" type="button">
          <FaUserCircle size={20} /> Admin ▼
        </button>
        <div className="dropdown-content">
          <Link to="/perfil-admin">Mi Perfil</Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    </nav>
  );
};

export default Barradenavegacion;
