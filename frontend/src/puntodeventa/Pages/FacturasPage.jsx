import React from "react";
import { useAuth } from "../../auth/context";
import { useFacturas } from "../hooks/useFacturas";
import { FacturasTable } from "../components/FacturasTable";
import { FaFileInvoice } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export const FacturasPage = () => {
  const { usuario } = useAuth();
  const facturas = useFacturas(usuario?.id);

  return (
    <div className="container mt-5" style={{ marginLeft: "70px" }}>
      <h2 className="text-center mb-4 fw-bold">
        <FaFileInvoice className="me-2" />
        Historial de Facturas
      </h2>
      <FacturasTable facturas={facturas} />
    </div>
  );
};

export default FacturasPage;
