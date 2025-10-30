import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/context";
import { FaCashRegister, FaHistory, FaFileInvoice, FaUser, FaSignOutAlt } from "react-icons/fa";

export  const BarraLateralVentas = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const links = [
    { path: "/punto-de-venta", label: "Punto de Venta", icon: <FaCashRegister /> },
    { path: "/historial-compras", label: "Historial", icon: <FaHistory /> },
    { path: "/facturas", label: "Facturas", icon: <FaFileInvoice /> },
    { path: "/perfil", label: "Perfil", icon: <FaUser /> },
  ];

  return (
    <div
      className="bg-dark text-white d-flex flex-column justify-content-between p-3"
      style={{
        width: "220px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div>
        <h4 className="mb-4 text-center">Fishware</h4>
        <ul className="nav flex-column">
          {links.map((link, index) => (
            <li className="nav-item mb-3" key={index}>
              <Link
                to={link.path}
                className={`nav-link d-flex align-items-center text-white ${
                  location.pathname === link.path ? "fw-bold text-primary" : ""
                }`}
              >
                <span className="me-2">{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={logout} className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center">
          <FaSignOutAlt className="me-2" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default BarraLateralVentas;
